    //Scroll suave
    document.querySelectorAll('a[href^=""]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

document.addEventListener('DOMContentLoaded', (event) => {
    const summary = document.getElementById('summary');
    const pfpSumm = document.getElementById('pfp');
    const summaryCont = document.getElementById('summSection');

    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                summary.classList.add('visible');
                pfpSumm.classList.add('visible');
                // observer.unobserve(summaryCont);
            } else {
                summary.classList.remove('visible');
                pfpSumm.classList.remove('visible');
            }
        
        });
    }
    const options = {
        threshold: 0.2//  callback se ejecute cuando al menos el 50% del elemento sea visible
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(summary);
});

//Carousel proyectos
const projectsCards = [
    { title: 'Proyecto 1', description: 'Descripción del Proyecto 1', image: 'tempProj.png' , numProyect: '1'},
    { title: 'Proyecto 2', description: 'Descripción del Proyecto 2', image: 'tempProj.png' ,numProyect: '2'},
    { title: 'Proyecto 3', description: 'Descripción del Proyecto 3', image: 'tempProj.png' ,numProyect: '3'},
    { title: 'Proyecto 4', description: 'Descripción del Proyecto 4', image: 'tempProj.png' ,numProyect: '4'},
    // Agrega más proyectos según sea necesario
];

// Obtén la referencia al elemento que contiene el carrusel
const carouselProjInner = document.querySelector('#carouselProjectsInner');

// Divide las cards en grupos de 3
const groupsOfThree = [];
for (let i = 0; i < projectsCards.length; i += 3) {
    groupsOfThree.push(projectsCards.slice(i, i + 3));
}
// Itera sobre los grupos de 3 cards y crea diapositivas de carrusel para cada grupo
groupsOfThree.forEach((group, index) => {
    const indexProj = 0;
    const activeClass = index === 0 ? 'active' : ''; // Marca la primera diapositiva como activa
    const carouselItems = group.map(card => `
        <div class="col-md-4">
        <a href="#projectModal" class="cardlink" data-bs-toggle="modal" data-project="project${card.numProyect}">
            <div class="card">
                <div class="img-container"><img src="${card.image}" alt="${card.title}" class="img-fluid"></div>
                <h4 class="card-title text-center">${card.title}</h4>
                <article class="card-text articlecard">${card.description}</article>
            </div>
            </a> 
        </div>
    `).join('');

    const carouselSlide = `
        <div class="carousel-item ${activeClass}">
            <div class="row">
                ${carouselItems}
            </div>
        </div>
    `;
    carouselProjInner.insertAdjacentHTML('beforeend', carouselSlide);
});
const projectCarousel = new bootstrap.Carousel(document.getElementById('projectCarousel'));
//Detalle proyectos dinamicos 
const projects = {
    project1:{
        title: "Proyecto 1",
        slides: [
            { src : "Images/login.png" ,caption:"valor caption 1", comment: "Slide 1 comment custom"},
            { src : "Images/Mainpage.png" ,caption:"valor caption 2",comment: ""}
        ]
    },
    project2:{
        title: "Proyecto 2",
        slides: [
            {src : "Images/proj2.png" , caption: "valorcap1",comment: ""},
            {src : "Images/proj2-1.png" , caption: "valorcap2",comment: ""}
        ]
    },
    project3: {
        title:"Proyecto 3",
        slides: [
            {src : "Images/proj3.png" , caption: "valorcap1-3",comment: ""},
            {src : "Images/proj3-1.png" , caption: "valorcap2-3",comment: ""}
        ]
    }
}
const projectsOnPage = document.querySelectorAll('.cardlink');
projectsOnPage.forEach(projectCard => {
            projectCard.addEventListener('click', function () {

                const projectKey = this.getAttribute('data-project');
                const projectToShow = projects[projectKey];


                if (projectToShow) {
                    const modal = $('#projectModal');
                    modal.find('.modal-title').text(projectToShow.title);
                    const carouselInner = modal.find('.carousel-inner');
                    carouselInner.empty();

                    console.log(projectToShow.slides);
                    projectToShow.slides.forEach((slide, index) => {
                        const activeClass = index === 0 ? 'active' : '';
                        carouselInner.append(`
                                    <div class="carousel-item ${activeClass}">
                                        <img class="d-block w-100" src="${slide.src}" alt="Slide ${index + 1}">
                                        <div class="carousel-caption d-none d-md-block">
                                            <p>${slide.caption}</p>
                                        </div>
                                        <div class="commentSlide">
                                        <p>${slide.comment}</p>
                                        </div>
                                    </div>
                                    
                                `);
                    });
                    $('#carouselExampleIndicators').carousel({
                        interval: 1000,
                        ride: 'carousel'
                    });
                }
            })
        });
