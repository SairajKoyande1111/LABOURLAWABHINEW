module.exports = {
  apps: [
    {
      name: 'labourcodes',
      script: 'server/index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        API_PORT: 8787,
        MONGODB_URI: 'mongodb+srv://abhijeet18012001_db_user:q8T3i11qL29BI8Qd@cluster0.szsz7t5.mongodb.net/?appName=Cluster0',
        CLOUDINARY_URL: 'cloudinary://154853841235429:Mvww8smlyr3G3mWeZ7ji_SR9uiQ@dayzlqvcx',
        SESSION_SECRET: 'b67555c4d08f7d94eb9f17447715f439cea7045b8ec77f892f8dd6de6da13e2d0d126801e3fb98540db19b267fb33c43',
      },
    },
  ],
};
