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
                    console.log("soy el observer");

                    // summary.style.display = "block";
                    // pfpSumm.style.display = "block";
                    summary.classList.add('visible');
                    pfpSumm.classList.add('visible');


                    // observer.unobserve(summaryCont);
                } else {
                    console.log("soy el observer yendose");
                    // summary.style.display = "none";
                    // pfpSumm.style.display = "none";
                    summary.classList.remove('visible');
                    pfpSumm.classList.remove('visible');

                }

            });
        }
        const options = {
            threshold: 0.2 //  callback se ejecute cuando al menos el 50% del elemento sea visible
        };

        const observer = new IntersectionObserver(callback, options);
        observer.observe(summaryCont);
    });

    //Carousel proyectos
    const projectsCards = [{
            title: 'Liquidaciones',
            description: 'Automatización en calculo de reintegros para clientes, ahorrando tiempo y mejorando la precisión.',
            image: 'liqui.jpg',
            numProyect: '1'
        },
        {
            title: 'Geolocalización',
            description: 'Crea mapas interactivos en Azure para analizar límites, coordenadas y otros detalles geográficos de manera intuitiva.',
            image: 'geolocalizacion.jpg',
            numProyect: '2'
        },
        {
            title: 'Escenarios de Cumplimiento',
            description: 'Carga de archivos personalizables y obtención de escenarios de cumplimiento de stock y días de inventario disponibles.',
            image: 'planeacion.jpg',
            numProyect: '3'
        },
        {
            title: 'Monitoreo en tiempo real de ventas',
            description: 'Seguimiento en <i>real-time</i> de las ventas a nivel de cliente y producto, comparándolas con objetivos mensuales.',
            image: 'monitventas.jpg',
            numProyect: '4'
        },
        {
            title: 'Profit & Loss (<i>P&L</i>)',
            description: 'Muestreo y automatización de procesos de provisión y emisión, incluyendo gráficos y tablas para un análisis completo',
            image: 'profloss.jpg',
            numProyect: '5'
        },
        {
            title: 'Motor de Recomendación',
            description: 'Sugerencias adaptadas al cliente según preferencias,agrupados por tipo y producto.',
            image: 'motorbusqueda.jpg',
            numProyect: '6'
        },
        {
            title: 'Web Scraping',
            description: 'Extracción de metricas y datos de sitios web para facilitar analisis.',
            image: 'webscrap.jpg',
            numProyect: '7'
        },
        // Agrega más proyectos según sea necesario
    ];

    // Obtén la referencia al elemento que contiene el carrusel
    const carouselProjInner = document.querySelector('#carouselProjectsInner');

    // Divide las cards en grupos de 3
    const groupsOfThree = [];
    for (let i = 0; i < projectsCards.length; i += 3) {
        let arrayToPush = projectsCards.slice(i, i + 3);
        // Relleno de proyectos en caso que no haya numProyectos % 3 === 0
        if (arrayToPush.length != 3) {
            let j = 0;
            while (arrayToPush.length < 3) {
                arrayToPush.push(projectsCards[j]);
                j++;
            }
        }
        groupsOfThree.push(arrayToPush);

    }
    // Itera sobre los grupos de 3 cards y crea diapositivas de carrusel para cada grupo
    groupsOfThree.forEach((group, index) => {
        const indexProj = 0;
        const activeClass = index === 0 ? 'active' : ''; // Marca la primera diapositiva como activa
        const carouselItems = group.map(card => `
        <div class="col-md-4">
        <a href="#projectModal" class="cardlink" data-bs-toggle="modal" data-project="project${card.numProyect}" title ="">
            <div class="card border-rounded border-3 ">
                <img src="${card.image}" alt="${card.title}" class="card-img-top img-fluid">
                <div class="card-body">
                <h4 class="card-title text-center">${card.title.toUpperCase()}</h4>
                <p class="card-text articlecard">${card.description}</p>
                </div>
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
        project1: {
            title: "Proyecto 1 - Automatización de cálculos de reintegros",
            slides: [{
                    src: "liqui2.jpg",
                    caption: "",
                    comment: "dashboard de Power BI que automatiza el cálculo de reintegros para cada cliente, ahorrando tiempo y mejorando la precisión."
                }
            ]
        },
        project2: {
            title: "Proyecto 2 - Geolocalización",
            slides: [{
                    src: "geoloqui.jpg",
                    caption: "",
                    comment: "Visualización de datos geográficos en mapas interactivos: Crea mapas interactivos en Azure para analizar límites, coordenadas y otros detalles geográficos de manera intuitiva."
                }
            ]
        },
        project3: {
            title: "Proyecto 3 - IT (Escenarios de Cumplimiento)",
            slides: [{
                    src: "cucum.png",
                    caption: "",
                    comment: "Optimización de inventario con escenarios personalizables: Implementa un dashboard que permite cargar archivos personalizables y obtener hasta 3 escenarios de cumplimiento de stock y días de inventario disponibles."
                }
            ]
        },
        project4: {
            title: "Proyecto 4 - Cuotas (Monitoreo en tiempo real de ventas)",
            slides: [{
                    src: "ventascu.jpg",
                    caption: "",
                    comment: " Análisis financiero completo: Crea un dashboard que muestra información contable y automatiza procesos de provisión y emisión, incluyendo gráficos y tablas para un análisis completo."
                }
            ]
        },
        project5: {
            title: "Proyecto 5 - PnL (Estado de Resultados)",
            slides: [{
                    src: "p&l2.jpg",
                    caption: "",
                    comment: " Desarrolla un dashboard que permite realizar un seguimiento en tiempo real de las ventas a nivel de cliente y producto, comparándolas con objetivos mensuales."
                }
            ]
        },
        project6: {
            title: "Proyecto 6 - Motor de Recomendación",
            slides: [{
                    src: "motor2.png",
                    caption: "",
                    comment: " Recomendaciones personalizadas con algoritmo híbrido: Implementa un algoritmo híbrido que considera la segmentación por clientes y por productos para ofrecer sugerencias personalizadas y adaptadas a las preferencias de cada usuario."
                }
            ]
        },
        project7: {
            title: "Proyecto 7 - Web Scraping",
            slides: [{
                    src: "webscraping2.jpg",
                    caption: "",
                    comment: "Recopilación de datos relevantes mediante scraping: Extrae métricas y datos relevantes de diferentes sitios web para enriquecer tus análisis."
                }
            ]
        }
    }

    const projectsOnPage = document.querySelectorAll('.cardlink');
    projectsOnPage.forEach(projectCard => {
        projectCard.addEventListener('click', function () {

            const projectKey = this.getAttribute('data-project');
            const projectToShow = projects[projectKey];
            console.log(projectToShow);
            if(projectToShow)
                {
                    const modal = $('#projectModal');
                    modal.find('.modal-title').text(projectToShow.title);
                    const gridToDisplay = modal.find('.modal-body');

                    gridToDisplay.empty();

                    gridToDisplay.append(`<div class="innerprojimg border bordered border-1 border-dark">
                            <img src="${projectToShow.slides[0].src}" alt="" class="img-fluid">
                        </div>
                        <div class="row text p-4">
                            <div class="col border bordered border-1 border-dark border-top-0 border-bottom-0"><h4 class="lead"><u>Desafio</u></h4><p>        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat, similique, sequi sed ullam exercitationem optio ab veniam in accusantium ipsum porro facilis laudantium fugiat dolore, a doloremque vero saepe modi!
</p></div>
                            <div class="col border bordered border-1 border-dark border-top-0 border-bottom-0"><h4 class="lead"><u>Logrado</u></h4><p>        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat, similique, sequi sed ullam exercitationem optio ab veniam in accusantium ipsum porro facilis laudantium fugiat dolore, a doloremque vero saepe modi!
</p></div>
                            <div class="col border bordered border-1 border-dark border-top-0 border-bottom-0"><h4 class="lead"><u>Resultados</u></h4><p>        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat, similique, sequi sed ullam exercitationem optio ab veniam in accusantium ipsum porro facilis laudantium fugiat dolore, a doloremque vero saepe modi!
</p></div>
                        </div>
                        `)
                }
        })
    });
    //manejo envio mail
    const rspMessage = document.getElementById("responseMsg");
    const formContact = document.getElementById("formcontact");
    formContact.addEventListener("submit", async (event) => { //*323222
        event.preventDefault(); //Evitar recargo con info al lanzar evento  + anterior sumado a la func de arriba
        const formData = new FormData(formContact);
        

        try {
            //la funcion toma await xq en si toda la func es async *323222
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            console.log("response")
            console.log(response);

            const result = await response.json();

            if (response.ok) {
                rspMessage.textContent = 'Email sent successfully!';
                rspMessage.style.color = 'green';
            } else {
                rspMessage.textContent = `Error: ${result.message || 'Email could not be sent'}`;
                rspMessage.style.color = 'red';
            }
            formContact.reset();
        } catch (error) {
            rspMessage.textContent = `Error: ${result.message || 'Unexpected error.Email could not be sent'}`;
            rspMessage.style.color = 'red';
        }
    });






    


    
    
    

    