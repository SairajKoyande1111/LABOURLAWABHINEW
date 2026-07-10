// One-off migration script: populates MongoDB with the site's existing
// hardcoded Home / Services / Careers content, and creates the initial
// admin user. Safe to re-run — it only fills in missing documents.
import bcrypt from 'bcryptjs';
import { connectDB } from './db.js';
import Admin from './models/Admin.js';
import Home from './models/Home.js';
import Service from './models/Service.js';
import Job from './models/Job.js';
import Resource from './models/Resource.js';
import { servicesSeed } from './seedData/services.js';
import { jobsSeed } from './seedData/jobs.js';
import { homeSeed } from './seedData/home.js';
import { resourcesSeed } from './seedData/resources.js';

async function run() {
  await connectDB();

  // Admin user
  const username = (process.env.SEED_ADMIN_USERNAME || 'admin').toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!';
  const existingAdmin = await Admin.findOne({ username });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(password, 10);
    await Admin.create({ username, passwordHash });
    console.log(`[seed] Created admin user "${username}"`);
  } else {
    console.log(`[seed] Admin user "${username}" already exists — skipped`);
  }

  // Home content
  const existingHome = await Home.findOne({ singleton: 'home' });
  if (!existingHome) {
    await Home.create({ singleton: 'home', ...homeSeed });
    console.log('[seed] Created Home content');
  } else {
    console.log('[seed] Home content already exists — skipped');
  }

  // Services
  const serviceCount = await Service.countDocuments();
  if (serviceCount === 0) {
    await Service.insertMany(servicesSeed);
    console.log(`[seed] Inserted ${servicesSeed.length} services`);
  } else {
    console.log('[seed] Services already exist — skipped');
  }

  // Jobs
  const jobCount = await Job.countDocuments();
  if (jobCount === 0) {
    await Job.insertMany(jobsSeed);
    console.log(`[seed] Inserted ${jobsSeed.length} jobs`);
  } else {
    console.log('[seed] Jobs already exist — skipped');
  }

  // Resources
  const resourceCount = await Resource.countDocuments();
  if (resourceCount === 0) {
    await Resource.insertMany(resourcesSeed);
    console.log(`[seed] Inserted ${resourcesSeed.length} resources`);
  } else {
    console.log('[seed] Resources already exist — skipped');
  }

  console.log('[seed] Done.');
  process.exit(0);
}

run().catch((err) => {
  console.error('[seed] Failed', err);
  process.exit(1);
});
