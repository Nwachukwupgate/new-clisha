/* eslint-disable import/no-extraneous-dependencies */
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaTwitter, FaLinkedinIn, FaPinterestP, FaRedditAlien } from 'react-icons/fa';

export const socialPlatforms = [
  { name: 'Facebook', icon: <FaFacebookF />, color: 'bg-primary', description: 'Connect with friends and communities' },
  { name: 'Instagram', icon: <FaInstagram />, color: 'bg-danger', description: 'Share visual content and stories' },
  { name: 'YouTube', icon: <FaYoutube />, color: 'bg-danger', description: 'Watch and create video content' },
  { name: 'TikTok', icon: <FaTiktok />, color: 'bg-dark', description: 'Short-form video entertainment' },
  { name: 'X (Twitter)', icon: <FaTwitter />, color: 'bg-info', description: 'Real-time news and conversations' },
  { name: 'LinkedIn', icon: <FaLinkedinIn />, color: 'bg-primary', description: 'Professional networking platform' },
  { name: 'Pinterest', icon: <FaPinterestP />, color: 'bg-danger', description: 'Discover ideas and inspiration' },
  { name: 'Reddit', icon: <FaRedditAlien />, color: 'bg-warning', description: 'Community discussions and forums' }
];
