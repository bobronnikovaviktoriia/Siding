const projects = [
  {
    tag: "ESQ",
    title: "ESQ Project",
    details: "",
    thumb: "images/ESQ.jpeg",
    images: [
      { src: "images/ESQ.jpeg" }
    ]
  },

  {
    tag: "NS",
    title: "NS Project",
    details: "",
    thumb: "images/NS.jpeg",
    images: [
      { src: "images/NS.jpeg" }
    ]
  },

  {
    tag: "COL",
    title: "COL Project",
    details: "",
    thumb: "images/COL1.jpeg",
    images: [
      { src: "images/COL1.jpeg" },
      { src: "images/COL2.jpeg" },
      { src: "images/COL3.jpeg" },
      { src: "images/COL4.jpeg" },
      { src: "images/COL5.jpeg" }
    ]
  },

  {
    tag: "MI",
    title: "MI Project",
    details: "",
    thumb: "images/MI1.jpeg",
    images: [
      { src: "images/MI1.jpeg" },
      { src: "images/MI2.jpeg" },
      { src: "images/MI3.jpeg" },
      { src: "images/MI4.jpeg" },
      { src: "images/MI5.jpeg" },
      { src: "images/MI6.jpeg" },
      { src: "images/MI7.jpeg" },
      { src: "images/MI8.jpeg" }
    ]
  }
];

const portGrid = document.getElementById('portGrid');
projects.forEach((project, i) => {
  const card = document.createElement('div');
  card.className = 'port-card';
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `Open photo gallery: ${project.title}`);
  card.innerHTML = `
  <span class="port-count">1 / ${project.images.length}</span>
  <div class="port-thumb" style="background-image:url('${project.thumb}');">
    <span class="port-tag">${project.tag}</span>
    <h3>${project.title}</h3>
  </div>
`;

  card.addEventListener('click', () => openModal(i));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(i); }
  });
  portGrid.appendChild(card);
});

const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const carouselTrack = document.getElementById('carouselTrack');
const carouselDots = document.getElementById('carouselDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const modalTag = document.getElementById('modalTag');
const modalTitle = document.getElementById('modalTitle');
const modalDetails = document.getElementById('modalDetails');

let currentProject = 0;
let currentSlide = 0;

function openModal(projectIndex) {
  currentProject = projectIndex;
  currentSlide = 0;
  const project = projects[currentProject];

  modalTag.textContent = project.tag;
  modalTitle.textContent = project.title;
  modalDetails.textContent = project.details;

  carouselTrack.innerHTML = project.images.map((image, idx) => `
  <div class="carousel-slide" data-index="${idx}">
    <img src="${image.src}" alt="${project.title} — photo ${idx + 1}">
    <span class="ph-label">Photo ${idx + 1} of ${project.images.length}</span>
    <span class="ph-sub">${project.title}</span>
  </div>
`).join('');


  carouselDots.innerHTML = project.images.map((_, idx) =>
    `<button class="carousel-dot" data-index="${idx}" aria-label="Go to photo ${idx + 1}"></button>`
  ).join('');

  carouselDots.querySelectorAll('.carousel-dot').forEach(dot => {
    dot.addEventListener('click', () => showSlide(parseInt(dot.dataset.index, 10)));
  });

  showSlide(0);
  modalOverlay.classList.add('open');
  modalClose.focus();
}

function closeModal() {
  modalOverlay.classList.remove('open');
}

function showSlide(index) {
  const project = projects[currentProject];
  const total = project.images.length;
  currentSlide = (index + total) % total;

  carouselTrack.querySelectorAll('.carousel-slide').forEach(slide => {
    slide.classList.toggle('active', parseInt(slide.dataset.index, 10) === currentSlide);
  });
  carouselDots.querySelectorAll('.carousel-dot').forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentSlide);
  });

  const cardCount = document.querySelectorAll('.port-card')[currentProject].querySelector('.port-count');
  cardCount.textContent = `${currentSlide + 1} / ${total}`;
}

prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (!modalOverlay.classList.contains('open')) return;
  if (e.key === 'Escape') closeModal();
  if (e.key === 'ArrowRight') showSlide(currentSlide + 1);
  if (e.key === 'ArrowLeft') showSlide(currentSlide - 1);
});

const burger = document.getElementById('burgerBtn');
const navList = document.getElementById('navList');
burger.addEventListener('click', () => navList.classList.toggle('open'));
navList.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navList.classList.remove('open')));
