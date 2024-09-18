const jobObject = {
  "jobs": [
    {
      "title": "Software Engineer Associate",
      "description": "Design and develop stable software solutions that include automated test validation. Participate in code reviews and contribute to the improvement of the overall code quality.",
      "responsibilities": [
        "Design, develop, test, and deploy software applications",
        "Participate in code reviews and contribute to the improvement of the overall code quality",
        "Collaborate with cross-functional teams to identify and prioritize project requirements"
      ],
      "requirements": [
        "Bachelor's degree in Computer Science or related field",
        "2+ years of experience in software development",
        "Proficiency in programming languages such as Java, Python, or C++"
      ],
      "company": "ABC Corporation",
      "salaryRange": "$80,000 - $110,000 per year",
      "locations": ["New York, NY", "San Francisco, CA", "Remote"]
    },
    {
      "title": "Marketing Manager",
      "description": "Develop and execute marketing strategies to drive business growth. Manage and optimize marketing campaigns across multiple channels.",
      "responsibilities": [
        "Develop and execute marketing strategies to drive business growth",
        "Manage and optimize marketing campaigns across multiple channels",
        "Analyze campaign results and provide actionable insights to improve future campaigns"
      ],
      "requirements": [
        "Bachelor's degree in Marketing or related field",
        "5+ years of experience in marketing",
        "Proven track record of successful marketing campaigns"
      ],
      "company": "XYZ Inc.",
      "salaryRange": "$100,000 - $140,000 per year",
      "locations": ["Los Angeles, CA", "Chicago, IL", "Remote"]
    },
    {
      "title": "Data Analyst",
      "description": "Analyze and interpret complex data to inform business decisions. Develop and maintain databases and data systems.",
      "responsibilities": [
        "Analyze and interpret complex data to inform business decisions",
        "Develop and maintain databases and data systems",
        "Create data visualizations and reports to communicate insights to stakeholders"
      ],
      "requirements": [
        "Bachelor's degree in Computer Science, Statistics, or related field",
        "2+ years of experience in data analysis",
        "Proficiency in data analysis tools such as Excel, SQL, or Tableau"
      ],
      "company": " DEF Analytics",
      "salaryRange": "$60,000 - $90,000 per year",
      "locations": ["Boston, MA", "Washington, D.C.", "Remote"]
    },
    {
      "title": "UX/UI Designer",
      "description": "Design and develop visually appealing and user-friendly interfaces for software applications. Conduct user research and testing to inform design decisions.",
      "responsibilities": [
        "Design and develop visually appealing and user-friendly interfaces for software applications",
        "Conduct user research and testing to inform design decisions",
        "Collaborate with cross-functional teams to identify and prioritize project requirements"
      ],
      "requirements": [
        "Bachelor's degree in Design or related field",
        "2+ years of experience in UX/UI design",
        "Proficiency in design tools such as Sketch, Figma, or Adobe Creative Suite"
      ],
      "company": "GHI Design Studio",
      "salaryRange": "$70,000 - $100,000 per year",
      "locations": ["San Francisco, CA", "New York, NY", "Remote"]
    },
    {
      "title": "Customer Support Representative",
      "description": "Provide exceptional customer service via phone, email, and chat. Troubleshoot and resolve customer issues in a timely and professional manner.",
      "responsibilities": [
        "Provide exceptional customer service via phone, email, and chat",
        "Troubleshoot and resolve customer issues in a timely and professional manner",
        "Document customer interactions and maintain accurate records"
      ],
      "requirements": [
        "High school diploma or equivalent",
        "1+ year of experience in customer support",
        "Excellent communication and problem-solving skills"
      ],
      "company": "JKL Customer Solutions",
      "salaryRange": "$40,000 - $60,000 per year",
      "locations": ["Phoenix, AZ", "Dallas, TX", "Remote"]
    }
  ]
}


// Navigation
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');

        // Only handle navigation if it starts with a hash for single-page apps
        if (targetId.startsWith('#')) {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                // Hide all sections and show the targeted one
                sections.forEach(section => section.classList.remove('active'));
                targetSection.classList.add('active');
            }
        } else {
            // Navigate to the href directly for multi-page navigation
            window.location.href = targetId;
        }
    });
});

function displayJobs(jobs) {
  const root = document.getElementById('root');
  if (!root) {
    console.error('Root element not found');
    return;
  }
  root.innerHTML = '';

  if (jobs.length === 0) {
    root.innerHTML = '<p class="no-jobs">No jobs found matching your search criteria.</p>';
    return;
  }

  const jobsContainer = document.createElement('div');
  jobsContainer.className = 'jobs-container';

  jobs.forEach(job => {
    const jobCard = createJobCard(job);
    jobsContainer.appendChild(jobCard);
  });

  root.appendChild(jobsContainer);
}

function createJobCard(job) {
  const card = document.createElement('div');
  card.className = 'job-card';

  card.innerHTML = `
    <h3>${job.title}</h3>
    <p class="company">${job.company}</p>
    <p class="location">📍 ${job.locations.join(', ')}</p>
    <p class="salary">💰 ${job.salaryRange}</p>
    <p class="description">${job.description}</p>
    <div class="requirements">
      <h4>Requirements:</h4>
      <ul>
        ${job.requirements.map(req => `<li>${req}</li>`).join('')}
      </ul>
    </div>
    <a href="#" class="apply-btn">Apply Now</a>
  `;

  // Add click event to expand/collapse the card
  card.addEventListener('click', function(e) {
    if (!e.target.classList.contains('apply-btn')) {
      this.classList.toggle('expanded');
    }
  });

  // Prevent the card from collapsing when clicking the apply button
  const applyBtn = card.querySelector('.apply-btn');
  applyBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    alert('Application submitted for ' + job.title);
  });

  return card;
}

function searchJobs() {
  const searchInput = document.getElementById('search');
  if (!searchInput) {
    console.error('Search input not found');
    return;
  }
  const searchTerm = searchInput.value.toLowerCase();
  console.log('Searching for:', searchTerm);
  performSearch(searchTerm);
}

function performSearch(searchTerm) {
  console.log('Performing search for:', searchTerm);
  const filteredJobs = jobObject.jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm) || 
    job.company.toLowerCase().includes(searchTerm) ||
    job.description.toLowerCase().includes(searchTerm)
  );
  console.log('Filtered jobs:', filteredJobs);
  displayJobs(filteredJobs);
}

// Navigation
const sections = document.querySelectorAll('section');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    sections.forEach(section => {
      section.classList.remove('active');
    });
    document.getElementById(targetId).classList.add('active');
  });
});

// Mobile menu
document.addEventListener('DOMContentLoaded', function() {
  var hamburger = document.getElementById('hamburger');
  var nav = document.querySelector('nav');

  hamburger.addEventListener('click', function() {
      nav.classList.toggle('show');
  });
});

// Initial job listing
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('search');

  if (searchQuery) {
    const searchInput = document.getElementById('search');
    if (searchInput) {
      searchInput.value = searchQuery;
      performSearch(searchQuery.toLowerCase());
    }
  } else {
    displayJobs(jobObject.jobs);
  }

  // Add event listener for search input
  const searchInput = document.getElementById('search');
  if (searchInput) {
    searchInput.addEventListener('input', searchJobs);
    console.log('Search event listener added');
  } else {
    console.error('Search input not found for event listener');
  }
});

function handleHomeSearch(event) {
  event.preventDefault();
  const jobTitleInput = document.getElementById('jobTitle');
  if (jobTitleInput) {
    const jobTitle = jobTitleInput.value;
    window.location.href = `JobListing.html?search=${encodeURIComponent(jobTitle)}`;
  } else {
    console.error('Job title input not found');
  }
  return false;
}

// Make sure these functions are available globally
window.searchJobs = searchJobs;
window.handleHomeSearch = handleHomeSearch;