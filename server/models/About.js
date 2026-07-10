import mongoose from 'mongoose';

const StatItem   = new mongoose.Schema({ value: String, label: String }, { _id: false });
const StorySlide = new mongoose.Schema({ heading: String, headingHighlight: String, body: String }, { _id: false });
const CoreValue  = new mongoose.Schema({ title: String, img: String }, { _id: false });
const Milestone  = new mongoose.Schema({ year: String, event: String, img: String, description: String }, { _id: false });
const WhyItem    = new mongoose.Schema({ point: String, sub: String }, { _id: false });
const TeamMember = new mongoose.Schema({ name: String, qualification: String, role: String, img: String }, { _id: false });

const AboutSchema = new mongoose.Schema({
  singleton: { type: String, default: 'about', unique: true },

  heroStats:      [StatItem],
  marqueeServices: [String],
  storySlides:    [StorySlide],

  pullQuoteLine1:        String,
  pullQuoteLine2:        String,
  pullQuoteLine3:        String,   // amber-coloured line
  pullQuoteAttribution:  String,

  coreValues:         [CoreValue],
  journeyMilestones:  [Milestone],
  whyChooseItems:     [WhyItem],
  teamMembers:        [TeamMember],

  // Hero section
  heroEyebrow:          String,
  heroHeadlineTop:      String,
  heroHeadlineHighlight:String,
  heroHeadlineBottom:   String,
  heroSubtext:          String,

  // Hero right-panel video (falls back to bundled hero video when blank)
  heroVideoUrl: { type: String, default: '' },

  // Story-bento video panel
  videoUrl: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.models.About || mongoose.model('About', AboutSchema);
