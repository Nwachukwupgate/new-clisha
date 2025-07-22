export const steps = [
    {
      id: 1,
      title: "Job & Education",
      icon: "👔",
      questions: [
        {
          key: "industry",
          label: "Which industry do you work in?",
          type: "single",
          tooltip: "This helps match you with tasks related to your field – so you earn more for what you're already familiar with.",
          options: [
            "Education", "Hospitality", "Construction / Trades", "Finance / Insurance",
            "Retail", "IT / Tech", "Healthcare", "Media / Creative", "Other"
          ]
        },
        {
          key: "education",
          label: "What is your highest level of education?",
          type: "single",
          tooltip: "We tailor content to your level – so tasks are neither too easy nor too complex.",
          options: [
            "No formal education", "Secondary / Vocational school", "High school diploma",
            "Bachelor's degree", "Master's degree", "Doctorate / PhD", "Other"
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Income & Shopping",
      icon: "💰",
      questions: [
        {
          key: "income",
          label: "What is your approximate annual income?",
          type: "single",
          tooltip: "So we can match you with relevant products and offers – from premium to budget-friendly.",
          options: [
            "Under €25,000", "€25,001–50,000", "€50,001–75,000",
            "€75,001–100,000", "Over €100,000", "Prefer not to say"
          ]
        },
        {
          key: "shopping_habits",
          label: "What matters most to you when shopping?",
          type: "multi",
          tooltip: "So you're matched with tasks that reflect your buying style – and earn from things you'd actually consider.",
          options: [
            "Low prices", "High quality", "Good customer service", "Fast delivery",
            "Sustainability", "Reviews from other buyers", "Trusted brands",
            "I shop spontaneously", "I plan my purchases carefully"
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Family & Children",
      icon: "👨‍👩‍👧‍👦",
      questions: [
        {
          key: "hasChildren",
          label: "Do you have children?",
          type: "special",
          tooltip: "Some tasks are designed specifically for parents – we'll only show you what's relevant.",
          options: ["Yes", "No", "Prefer not to say"]
        }
      ]
    },
    {
      id: 4,
      title: "Devices & Usage",
      icon: "📱",
      questions: [
        {
          key: "devices",
          label: "Which devices do you use regularly?",
          type: "multi",
          tooltip: "We'll only send you tasks that work well on your devices – so you don't waste time on things that won't load.",
          options: [
            "Smartphone", "Laptop", "Desktop computer", "Tablet",
            "Smartwatch / Wearables", "Other"
          ]
        },
        {
          key: "internet_usage",
          label: "What do you mostly use the internet for?",
          type: "multi",
          tooltip: "This helps match you with campaigns that fit how you naturally browse – and lets you earn faster.",
          options: [
            "Social media", "Online shopping", "Work", "Reading news",
            "Watching videos", "Gaming", "Email & communication"
          ]
        }
      ]
    },
    {
      id: 5,
      title: "Social & Content",
      icon: "📱",
      questions: [
        {
          key: "social_platforms",
          label: "Which social platforms do you actively use?",
          type: "multi",
          tooltip: "So we only show you tasks from platforms you actually use – and reward you for real interaction.",
          options: [
            "Facebook", "Instagram", "YouTube", "TikTok", "X (Twitter)",
            "LinkedIn", "Pinterest", "Reddit", "None"
          ]
        },
        {
          key: "content_types",
          label: "What types of content do you enjoy most?",
          type: "multi",
          tooltip: "To show you tasks in formats you like – so completing them feels natural, not forced.",
          options: [
            "Text-based content", "Images / graphics", "Videos",
            "Podcasts / audio", "Interactive tasks (quizzes, polls, etc.)"
          ]
        }
      ]
    },
    {
      id: 6,
      title: "Decision Making",
      icon: "🤔",
      questions: [
        {
          key: "buying_decisions",
          label: "How do you usually make buying decisions?",
          type: "single",
          tooltip: "So we know if you respond better to facts, reviews, visuals – or trust-based recommendations.",
          options: [
            "Quickly, without thinking too much", "After doing research and comparing",
            "I ask others for advice", "Advertising influences me", "I follow my gut"
          ]
        },
        {
          key: "price_comparison",
          label: "How often do you compare prices before buying?",
          type: "single",
          tooltip: "To match you with tasks like price checks, comparisons, or product reviews.",
          options: ["Always", "Often", "Rarely", "Never"]
        },
        {
          key: "sustainability",
          label: "How important is sustainability in your purchases?",
          type: "single",
          tooltip: "So you're shown eco-friendly brands only if that truly matters to you.",
          options: ["Very important", "Somewhat important", "Not very important", "Not important at all"]
        }
      ]
    },
    {
      id: 7,
      title: "Interests & Lifestyle",
      icon: "🌟",
      questions: [
        {
          key: "interests",
          label: "Which topics are you interested in?",
          type: "multi",
          tooltip: "So we can offer you tasks that reflect your true passions – and reward you for content you enjoy.",
          options: [
            "Food & cooking", "Fitness & health", "Travel & adventure", "Family & parenting",
            "Technology & gadgets", "Politics & society", "Fashion & beauty",
            "Career & education", "Gaming & pop culture", "Mindfulness & personal growth"
          ]
        }
      ]
    },
    {
      id: 8,
      title: "Consent & Privacy",
      icon: "🔒",
      questions: [
        {
          key: "consentLevel",
          label: "May we use your answers internally to show you better, more relevant tasks?",
          type: "special",
          tooltip: "",
          options: ["Yes, that's fine", "No, I'd prefer not", "Only anonymously"]
        }
      ]
    }
];