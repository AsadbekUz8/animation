// Motivatsion matnlarni o'zgartirish
const motivationalTexts = [
    "Bugun o'qishni boshla, ertaga muvaffaqiyatga erish!",
    "Har bir qadam kelajaging uchun!",
    "Bilim – sen uchun eng katta kuch!",
    "Muvaffaqiyat – bilim va mehnatning natijasi!",
    "Eng yaxshi repetitorlar bilan o'qish oson!"
];

let currentTextIndex = 0;
const motivationalTextElement = document.getElementById('motivational-text');

// Motivatsion matnlarni o'zgartirish funksiyasi
function changeMotivationalText() {
    motivationalTextElement.style.opacity = 0;
    
    setTimeout(() => {
        motivationalTextElement.textContent = motivationalTexts[currentTextIndex];
        motivationalTextElement.style.opacity = 1;
        
        currentTextIndex = (currentTextIndex + 1) % motivationalTexts.length;
    }, 500);
}

// Sahifa yuklanganda motivatsion matnni o'rnatish
if (motivationalTextElement) {
    motivationalTextElement.textContent = motivationalTexts[0];
    // Har 5 soniyada matnni o'zgartirish
    setInterval(changeMotivationalText, 5000);
}

// Orqa fon rasmlarini almashtirib turish
const slides = document.querySelectorAll('.hero-background .slide');
let currentSlideIndex = 0;

function changeBackgroundSlide() {
    // Barcha slayderlardan active klassini olib tashlash
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Joriy slaydga active klassini qo'shish
    slides[currentSlideIndex].classList.add('active');
    
    // Keyingi slayd indeksini hisoblash
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
}

// Sahifa yuklanganda birinchi slaydni ko'rsatish
if (slides.length > 0) {
    slides[0].classList.add('active');
    // Har 8 soniyada orqa fonni o'zgartirish
    setInterval(changeBackgroundSlide, 8000);
}

// Narx slayderini boshqarish
const priceSlider = document.getElementById('price');
const priceValue = document.getElementById('price-value');

if (priceSlider && priceValue) {
    priceSlider.addEventListener('input', function() {
        priceValue.textContent = this.value;
    });
}

// Ixtiyoriy fan qo'shish funksiyasi
const addSubjectBtn = document.getElementById('add-subject');
const customSubjectInput = document.getElementById('custom-subject');
const customSubjectsContainer = document.getElementById('custom-subjects-container');
const customSubjects = new Set();

if (addSubjectBtn && customSubjectInput && customSubjectsContainer) {
    addSubjectBtn.addEventListener('click', function() {
        const subjectName = customSubjectInput.value.trim();
        
        if (subjectName && !customSubjects.has(subjectName)) {
            // Yangi fanni to'plamga qo'shish
            customSubjects.add(subjectName);
            
            // Yangi fan tegini yaratish
            const subjectTag = document.createElement('div');
            subjectTag.className = 'custom-subject-tag';
            subjectTag.innerHTML = `
                ${subjectName}
                <span class="remove-subject" data-subject="${subjectName}">×</span>
            `;
            
            // Fanni konteynerga qo'shish
            customSubjectsContainer.appendChild(subjectTag);
            
            // Kiritish maydonini tozalash
            customSubjectInput.value = '';
            
            // O'chirish tugmasiga hodisa qo'shish
            const removeBtn = subjectTag.querySelector('.remove-subject');
            removeBtn.addEventListener('click', function() {
                const subject = this.getAttribute('data-subject');
                customSubjects.delete(subject);
                subjectTag.remove();
            });
        }
    });
    
    // Enter tugmasini bosish orqali ham fan qo'shish
    customSubjectInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSubjectBtn.click();
        }
    });
}

// Ro'yxatdan o'tish formasida ixtiyoriy fan qo'shish
const addRegSubjectBtn = document.getElementById('add-reg-subject');
const customRegSubjectInput = document.getElementById('custom-reg-subject');

if (addRegSubjectBtn && customRegSubjectInput) {
    addRegSubjectBtn.addEventListener('click', function() {
        const subjectName = customRegSubjectInput.value.trim();
        
        if (subjectName) {
            // Yangi option yaratish
            const option = document.createElement('option');
            option.value = subjectName.toLowerCase().replace(/\s+/g, '_');
            option.textContent = subjectName;
            option.selected = true;
            
            // Optionni select elementiga qo'shish
            const regSubjectSelect = document.getElementById('reg-subject');
            regSubjectSelect.appendChild(option);
            
            // Kiritish maydonini tozalash
            customRegSubjectInput.value = '';
        }
    });
    
    // Enter tugmasini bosish orqali ham fan qo'shish
    customRegSubjectInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addRegSubjectBtn.click();
        }
    });
}

// Qidiruv tugmasini boshqarish
const searchBtn = document.querySelector('.search-btn');
const searchFilters = document.querySelectorAll('.filter-group select, .filter-group input[type="range"]');

if (searchBtn) {
    searchBtn.addEventListener('click', function() {
        // Qidiruv filtrlari qiymatlarini olish
        const filters = {};
        searchFilters.forEach(filter => {
            if (filter.id && filter.value) {
                filters[filter.id] = filter.value;
            }
        });
        
        // Ixtiyoriy fanlarni qo'shish
        if (customSubjects.size > 0) {
            filters.customSubjects = Array.from(customSubjects);
        }
        
        // Bu yerda backend bilan aloqa qilish kerak
        console.log('Qidiruv filtrlari:', filters);
        
        // Qidiruv natijalarini ko'rsatish animatsiyasi
        const searchResults = document.querySelector('.search-results');
        if (searchResults) {
            searchResults.style.opacity = 0.5;
            setTimeout(() => {
                searchResults.style.opacity = 1;
            }, 500);
        }
    });
}

// Tez qidiruv tugmalarini boshqarish
const quickSearchBtn = document.querySelector('.search-quick .primary-btn');
const quickRegisterBtn = document.querySelector('.search-quick .secondary-btn');

if (quickSearchBtn) {
    quickSearchBtn.addEventListener('click', function() {
        const searchSection = document.getElementById('search');
        if (searchSection) {
            searchSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

if (quickRegisterBtn) {
    quickRegisterBtn.addEventListener('click', function() {
        const registrationSection = document.getElementById('registration');
        if (registrationSection) {
            registrationSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Ro'yxatdan o'tish formasiga animatsiyalar
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registration-form');
    const formGroups = document.querySelectorAll('.form-group');
    const subscriptionCards = document.querySelectorAll('.subscription-card');
    
    if (registrationForm) {
        // Form elementlariga animatsiya qo'shish
        formGroups.forEach((group, index) => {
            group.style.opacity = '0';
            group.style.transform = 'translateY(20px)';
            group.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                group.style.opacity = '1';
                group.style.transform = 'translateY(0)';
            }, 100 * index);
        });
        
        // To'lov rejasi kartochkalariga animatsiya
        subscriptionCards.forEach((card, index) => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = this.classList.contains('premium') ? 
                    'translateY(-10px) scale(1.08)' : 'translateY(-10px)';
                this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = this.classList.contains('premium') ? 
                    'scale(1.05)' : 'translateY(0)';
                this.style.boxShadow = '';
            });
            
            // To'lov rejasini tanlash
            const radioBtn = card.querySelector('input[type="radio"]');
            if (radioBtn) {
                radioBtn.addEventListener('change', function() {
                    subscriptionCards.forEach(c => c.classList.remove('active-subscription'));
                    if (this.checked) {
                        card.classList.add('active-subscription');
                    }
                });
            }
        });
        
        // Formani yuborish animatsiyasi
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.querySelector('.registration-form-submit');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Yuklanmoqda...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Muvaffaqiyatli yuborildi!';
                submitBtn.style.backgroundColor = '#10b981';
                
                setTimeout(() => {
                    alert('Tabriklaymiz! Siz muvaffaqiyatli ro\'yxatdan o\'tdingiz. Tez orada siz bilan bog\'lanamiz.');
                    registrationForm.reset();
                    submitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Ro\'yxatdan o\'tish';
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                    
                    // Aktiv to'lov rejasini qayta tiklash
                    document.getElementById('monthly').checked = true;
                    subscriptionCards.forEach(c => c.classList.remove('active-subscription'));
                    document.querySelector('.subscription-card.premium').classList.add('active-subscription');
                }, 1500);
            }, 2000);
        });
    }
});

// Aloqaga chiqish tugmalarini boshqarish
const contactButtons = document.querySelectorAll('.contact-btn');

contactButtons.forEach(button => {
    button.addEventListener('click', function() {
        const tutorName = this.closest('.tutor-info').querySelector('h3').textContent;
        
        // Modal oynani ko'rsatish yoki boshqa aloqa usulini tanlash mumkin
        alert(`${tutorName} bilan aloqaga chiqish uchun telefon raqamingizni kiriting.`);
        
        // Bu yerda aloqa ma'lumotlarini ko'rsatish kerak
        console.log(`${tutorName} bilan aloqaga chiqish`);
    });
});

// Resurs sotib olish tugmalarini boshqarish
const buyResourceButtons = document.querySelectorAll('.resource-info .primary-btn');

buyResourceButtons.forEach(button => {
    button.addEventListener('click', function() {
        const resourceName = this.closest('.resource-info').querySelector('h3').textContent;
        const resourcePrice = this.closest('.resource-info').querySelector('.resource-price').textContent;
        
        // To'lov sahifasiga o'tish yoki modal oynani ko'rsatish
        alert(`${resourceName} ni sotib olish uchun to'lov sahifasiga o'tkazilmoqdasiz. Narxi: ${resourcePrice}`);
        
        // Bu yerda to'lov tizimiga o'tish kerak
        console.log(`${resourceName} ni sotib olish, narxi: ${resourcePrice}`);
    });
});

// Scroll animatsiyasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Sahifa yuklanganda animatsiyalar
window.addEventListener('load', function() {
    // Header animatsiyasi
    const header = document.querySelector('header');
    if (header) {
        header.style.opacity = 0;
        header.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            header.style.opacity = 1;
            header.style.transform = 'translateY(0)';
            header.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        }, 100);
    }
    
    // Hero section animatsiyasi
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = 0;
        heroContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroContent.style.opacity = 1;
            heroContent.style.transform = 'translateY(0)';
            heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }, 300);
    }
});

// Responsive menu uchun
const createMobileMenu = () => {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    if (header && nav && window.innerWidth <= 768) {
        // Menu tugmasini yaratish
        if (!document.querySelector('.menu-toggle')) {
            const menuButton = document.createElement('button');
            menuButton.classList.add('menu-toggle');
            menuButton.innerHTML = '<i class="fas fa-bars"></i>';
            
            // Menu tugmasini headerga qo'shish
            header.insertBefore(menuButton, nav);
            
            // Menu tugmasiga click event qo'shish
            menuButton.addEventListener('click', function() {
                nav.classList.toggle('active');
                
                // Menu ikonkasini o'zgartirish
                if (nav.classList.contains('active')) {
                    menuButton.innerHTML = '<i class="fas fa-times"></i>';
                } else {
                    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        }
    } else if (window.innerWidth > 768) {
        // Mobil menyu tugmasini o'chirish
        const menuButton = document.querySelector('.menu-toggle');
        if (menuButton) {
            menuButton.remove();
        }
        
        // Menyu active klassini o'chirish
        if (nav) {
            nav.classList.remove('active');
        }
    }
};

// Oyna o'lchamini o'zgartirish hodisasini kuzatish
window.addEventListener('resize', createMobileMenu);

// Sahifa yuklanganda mobilniy menuni yaratish
window.addEventListener('load', createMobileMenu);

// Statistika raqamlarini animatsiya bilan ko'rsatish
function animateStatisticNumbers() {
    const statisticNumbers = document.querySelectorAll('.statistic-number');
    
    statisticNumbers.forEach(number => {
        const targetValue = parseInt(number.getAttribute('data-count'));
        const duration = 2000; // 2 soniya
        const startTime = Date.now();
        const startValue = 0;
        
        function updateNumber() {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            
            if (elapsedTime < duration) {
                const progress = elapsedTime / duration;
                // Easing funksiyasi qo'shish - cubic-bezier
                const easedProgress = cubicBezier(0.34, 1.56, 0.64, 1)(progress);
                const currentValue = Math.floor(startValue + easedProgress * (targetValue - startValue));
                number.textContent = currentValue.toLocaleString();
                requestAnimationFrame(updateNumber);
            } else {
                number.textContent = targetValue.toLocaleString();
                
                // Raqam to'liq ko'rsatilgandan so'ng, uni yaltirash effekti
                number.classList.add('animate__animated', 'animate__flash');
                setTimeout(() => {
                    number.classList.remove('animate__animated', 'animate__flash');
                }, 1000);
            }
        }
        
        updateNumber();
    });
}

// Cubic-bezier easing funksiyasi
function cubicBezier(x1, y1, x2, y2) {
    return function(t) {
        const cx = 3 * x1;
        const bx = 3 * (x2 - x1) - cx;
        const ax = 1 - cx - bx;
        
        const cy = 3 * y1;
        const by = 3 * (y2 - y1) - cy;
        const ay = 1 - cy - by;
        
        function sampleCurveX(t) {
            return ((ax * t + bx) * t + cx) * t;
        }
        
        function sampleCurveY(t) {
            return ((ay * t + by) * t + cy) * t;
        }
        
        function sampleCurveDerivativeX(t) {
            return (3 * ax * t + 2 * bx) * t + cx;
        }
        
        function solveCurveX(x, epsilon) {
            let t0, t1, t2, x2, d2, i;
            
            // First try a few iterations of Newton's method
            t2 = x;
            for (i = 0; i < 8; i++) {
                x2 = sampleCurveX(t2) - x;
                if (Math.abs(x2) < epsilon) {
                    return t2;
                }
                d2 = sampleCurveDerivativeX(t2);
                if (Math.abs(d2) < 1e-6) {
                    break;
                }
                t2 = t2 - x2 / d2;
            }
            
            // Fall back to the bisection method for reliability
            t0 = 0;
            t1 = 1;
            t2 = x;
            
            if (t2 < t0) return t0;
            if (t2 > t1) return t1;
            
            while (t0 < t1) {
                x2 = sampleCurveX(t2);
                if (Math.abs(x2 - x) < epsilon) {
                    return t2;
                }
                if (x > x2) {
                    t0 = t2;
                } else {
                    t1 = t2;
                }
                t2 = (t1 - t0) * 0.5 + t0;
            }
            
            return t2;
        }
        
        return sampleCurveY(solveCurveX(t, 1 / 1000));
    };
}

// AOS (Animate On Scroll) kutubxonasini ishga tushirish
document.addEventListener('DOMContentLoaded', function() {
    // AOS kutubxonasini ishga tushirish
    AOS.init({
        duration: 1000,
        once: false,
        mirror: true
    });
    
    // Statistika raqamlarini animatsiya qilish
    const statisticsSection = document.getElementById('statistics');
    if (statisticsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStatisticNumbers();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statisticsSection);
    }
    
    // Grafiklarni ishga tushirish
    initializeCharts();
    
    // Particles.js kutubxonasini ishga tushirish
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer && window.particlesJS) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#ffffff"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
});

// Statistika grafiklarini yaratish
function initializeCharts() {
    const ctx = document.getElementById('statisticsChart');
    if (!ctx) return;
    
    const subjectsData = {
        labels: ['Matematika', 'Ingliz tili', 'Fizika', 'Kimyo', 'Biologiya', 'Tarix'],
        datasets: [{
            label: 'Repetitorlar soni',
            data: [8, 6, 4, 3, 2, 1],
            backgroundColor: 'rgba(99, 102, 241, 0.7)',
            borderColor: 'rgba(99, 102, 241, 1)',
            borderWidth: 1
        }]
    };
    
    const regionsData = {
        labels: ['Toshkent', 'Samarqand', 'Andijon', 'Farg\'ona', 'Namangan', 'Boshqa'],
        datasets: [{
            label: 'Repetitorlar soni',
            data: [12, 4, 3, 2, 2, 1],
            backgroundColor: [
                'rgba(99, 102, 241, 0.7)',
                'rgba(16, 185, 129, 0.7)',
                'rgba(245, 158, 11, 0.7)',
                'rgba(239, 68, 68, 0.7)',
                'rgba(59, 130, 246, 0.7)',
                'rgba(168, 85, 247, 0.7)'
            ],
            borderColor: [
                'rgba(99, 102, 241, 1)',
                'rgba(16, 185, 129, 1)',
                'rgba(245, 158, 11, 1)',
                'rgba(239, 68, 68, 1)',
                'rgba(59, 130, 246, 1)',
                'rgba(168, 85, 247, 1)'
            ],
            borderWidth: 1
        }]
    };
    
    const growthData = {
        labels: ['Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust'],
        datasets: [
            {
                label: 'Yangi repetitorlar',
                data: [5, 8, 12, 18, 24, 30],
                backgroundColor: 'rgba(99, 102, 241, 0.5)',
                borderColor: 'rgba(99, 102, 241, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            },
            {
                label: 'Yangi o\'quvchilar',
                data: [3, 6, 10, 15, 22, 28],
                backgroundColor: 'rgba(16, 185, 129, 0.5)',
                borderColor: 'rgba(16, 185, 129, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }
        ]
    };
    
    let currentChart = null;
    let currentData = subjectsData;
    let chartType = 'bar';
    
    function createChart() {
        if (currentChart) {
            currentChart.destroy();
        }
        
        currentChart = new Chart(ctx, {
            type: chartType,
            data: currentData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        titleColor: '#1f2937',
                        bodyColor: '#1f2937',
                        borderColor: 'rgba(99, 102, 241, 0.5)',
                        borderWidth: 1,
                        padding: 12,
                        boxPadding: 6,
                        usePointStyle: true,
                        callbacks: {
                            labelTextColor: function() {
                                return '#1f2937';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
    
    createChart();
    
    const chartTabs = document.querySelectorAll('.chart-tab');
    chartTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            chartTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const chartId = this.getAttribute('data-chart');
            
            if (chartId === 'subjects') {
                currentData = subjectsData;
                chartType = 'bar';
            } else if (chartId === 'regions') {
                currentData = regionsData;
                chartType = 'pie';
            } else if (chartId === 'growth') {
                currentData = growthData;
                chartType = 'line';
            }
            
            createChart();
        });
    });
}

// Biz haqimizda bo'limidagi rasmlarni almashtirib turish
function initAboutSlider() {
    const aboutSlides = document.querySelectorAll('.about-image .slide');
    if (aboutSlides.length > 0) {
        let aboutSlideIndex = 0;
        
        // Birinchi slaydni ko'rsatish
        aboutSlides[0].style.opacity = '1';
        
        // Har 5 soniyada rasmlarni almashtirib turish
        setInterval(() => {
            // Joriy slaydni yashirish
            aboutSlides[aboutSlideIndex].style.opacity = '0';
            
            // Keyingi slayd indeksini hisoblash
            aboutSlideIndex = (aboutSlideIndex + 1) % aboutSlides.length;
            
            // Keyingi slaydni ko'rsatish
            aboutSlides[aboutSlideIndex].style.opacity = '1';
        }, 5000);
    }
}

// Forma elementlariga 3D effektlar qo'shish
function init3DEffects() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        const label = group.querySelector('label');
        
        if (input && label) {
            // Sichqoncha harakatini kuzatish
            group.addEventListener('mousemove', (e) => {
                const rect = group.getBoundingClientRect();
                const x = e.clientX - rect.left; // X pozitsiyasi
                const y = e.clientY - rect.top;  // Y pozitsiyasi
                
                // Elementning o'rtasidan sichqoncha pozitsiyasigacha bo'lgan masofani hisoblash
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Burilish burchagini hisoblash (maksimal 10 daraja)
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;
                
                // 3D effektni qo'llash
                group.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
                
                // Label effekti
                label.style.transform = `translateZ(20px)`;
                label.style.textShadow = `0 2px 5px rgba(0, 0, 0, 0.2)`;
            });
            
            // Sichqoncha chiqib ketganda effektni tiklash
            group.addEventListener('mouseleave', () => {
                group.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
                label.style.transform = '';
                label.style.textShadow = '';
            });
            
            // Fokus holatida effektni o'zgartirish
            input.addEventListener('focus', () => {
                group.style.transform = 'perspective(1000px) rotateX(-5deg) translateZ(10px)';
            });
            
            input.addEventListener('blur', () => {
                if (!group.matches(':hover')) {
                    group.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
                }
            });
        }
    });
}

// Sahifa yuklanganda funksiyalarni ishga tushirish
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // Yangi funksiyalarni chaqirish
    initAboutSlider();
    init3DEffects();
});

// To'lov rejalarini tanlash
document.addEventListener('DOMContentLoaded', function() {
    const subscriptionCards = document.querySelectorAll('.subscription-card');
    const subscriptionRadios = document.querySelectorAll('input[name="subscription"]');
    
    // To'lov rejasini tanlash
    subscriptionRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // Barcha kartochkalardan active klassini olib tashlash
            subscriptionCards.forEach(card => {
                card.classList.remove('active-subscription');
            });
            
            // Tanlangan kartochkaga active klassini qo'shish
            if (this.checked) {
                this.closest('.subscription-card').classList.add('active-subscription');
            }
        });
    });
    
    // Sahifa yuklanganda default tanlangan kartochkani belgilash
    const defaultRadio = document.querySelector('input[name="subscription"]:checked');
    if (defaultRadio) {
        defaultRadio.closest('.subscription-card').classList.add('active-subscription');
    }
    
    // To'lov rejasi haqida ma'lumot ko'rsatish
    const subscriptionInfo = document.querySelector('.subscription-info');
    const subscriptionInfoToggle = document.createElement('button');
    subscriptionInfoToggle.className = 'subscription-info-toggle';
    subscriptionInfoToggle.innerHTML = '<i class="fas fa-info-circle"></i> To\'lov rejalari haqida batafsil';
    
    // Toggle tugmasini qo'shish
    if (subscriptionInfo) {
        subscriptionInfo.style.display = 'none';
        subscriptionInfo.parentNode.insertBefore(subscriptionInfoToggle, subscriptionInfo);
        
        subscriptionInfoToggle.addEventListener('click', function() {
            if (subscriptionInfo.style.display === 'none') {
                subscriptionInfo.style.display = 'block';
                this.innerHTML = '<i class="fas fa-times-circle"></i> Yopish';
                
                // Scroll to info
                subscriptionInfo.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                subscriptionInfo.style.display = 'none';
                this.innerHTML = '<i class="fas fa-info-circle"></i> To\'lov rejalari haqida batafsil';
            }
        });
    }
});

// RT Logo interaktiv effektlari
document.addEventListener('DOMContentLoaded', function() {
    const logo3D = document.querySelector('.logo-3d');
    const logoContainer = document.querySelector('.logo-container');
    
    if (logo3D && logoContainer) {
        // Mouse harakati bilan logoni aylantirish
        logoContainer.addEventListener('mousemove', function(e) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            
            logo3D.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        // Mouse kirganda
        logoContainer.addEventListener('mouseenter', function() {
            logo3D.style.transition = 'none';
            
            // Logo ichidagi elementlarni oldinga chiqarish
            setTimeout(() => {
                const logoFaces = logo3D.querySelectorAll('div');
                logoFaces.forEach(face => {
                    face.style.transform = face.style.transform.replace('translateZ(30px)', 'translateZ(50px)');
                });
            }, 150);
        });
        
        // Mouse chiqqanda
        logoContainer.addEventListener('mouseleave', function() {
            logo3D.style.transition = 'all 0.5s ease';
            logo3D.style.transform = 'rotateY(0deg) rotateX(0deg)';
            
            // Logo ichidagi elementlarni normal holatga qaytarish
            const logoFaces = logo3D.querySelectorAll('div');
            logoFaces.forEach(face => {
                face.style.transform = face.style.transform.replace('translateZ(50px)', 'translateZ(30px)');
            });
        });
        
        // Logo bosilganda
        logoContainer.addEventListener('click', function() {
            logo3D.style.animation = 'logoSpin 1.5s ease-in-out';
            
            setTimeout(() => {
                logo3D.style.animation = 'logoFloat 3s ease-in-out infinite';
            }, 1500);
        });
    }
});

// Footer qismidagi 3D ijtimoiy tarmoq ikonkalariga animatsiya
document.addEventListener('DOMContentLoaded', function() {
    const socialIcons = document.querySelectorAll('.social-icon-3d');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.querySelector('.social-icon-inner').style.transform = 'rotateY(180deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.querySelector('.social-icon-inner').style.transform = 'rotateY(0)';
        });
        
        // 3D effekt uchun mouse harakatiga qarab animatsiya
        icon.addEventListener('mousemove', function(e) {
            const inner = this.querySelector('.social-icon-inner');
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 10;
            const moveY = (y - centerY) / 10;
            
            inner.style.transform = `rotateY(${moveX}deg) rotateX(${-moveY}deg)`;
        });
        
        icon.addEventListener('mouseleave', function() {
            const inner = this.querySelector('.social-icon-inner');
            inner.style.transform = 'rotateY(0) rotateX(0)';
        });
    });
    
    // Footer logosiga ham 3D effekt qo'shish
    const footerLogo = document.querySelector('.footer-logo .logo-3d');
    if (footerLogo) {
        footerLogo.addEventListener('mouseenter', function() {
            this.style.animation = 'logoSpin 1.5s ease-in-out';
        });
        
        footerLogo.addEventListener('animationend', function() {
            this.style.animation = 'logoFloat 3s ease-in-out infinite';
        });
    }
});

// Sahifadagi bo'limlarga sichqoncha effektlari
document.addEventListener('DOMContentLoaded', function() {
    // Qidiruv bo'limiga sichqoncha effekti
    const searchSection = document.getElementById('search');
    if (searchSection) {
        // Qidiruv bo'limiga sichqoncha effekti
        searchSection.addEventListener('mouseenter', function() {
            // Qidiruv bo'limiga kirish effekti
            const searchFilters = this.querySelectorAll('.filter-group');
            searchFilters.forEach((filter, index) => {
                setTimeout(() => {
                    filter.style.transform = 'translateY(-10px)';
                    filter.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
                }, index * 100);
            });
            
            // Qidiruv tugmasiga effekt
            const searchBtn = this.querySelector('.search-btn');
            if (searchBtn) {
                searchBtn.style.transform = 'scale(1.1)';
                searchBtn.style.boxShadow = '0 10px 20px rgba(99, 102, 241, 0.3)';
            }
            
            // Orqa fonga effekt
            this.style.backgroundPosition = 'right center';
        });
        
        searchSection.addEventListener('mouseleave', function() {
            // Qidiruv bo'limidan chiqish effekti
            const searchFilters = this.querySelectorAll('.filter-group');
            searchFilters.forEach(filter => {
                filter.style.transform = 'translateY(0)';
                filter.style.boxShadow = '';
            });
            
            // Qidiruv tugmasini normal holatga qaytarish
            const searchBtn = this.querySelector('.search-btn');
            if (searchBtn) {
                searchBtn.style.transform = '';
                searchBtn.style.boxShadow = '';
            }
            
            // Orqa fonni normal holatga qaytarish
            this.style.backgroundPosition = 'center center';
        });
        
        // Qidiruv natijalariga effekt
        const tutorCards = searchSection.querySelectorAll('.tutor-card');
        tutorCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) rotateY(10deg)';
                this.style.boxShadow = '0 20px 30px rgba(0, 0, 0, 0.15)';
                
                // Rasm effekti
                const tutorImage = this.querySelector('.tutor-image img');
                if (tutorImage) {
                    tutorImage.style.transform = 'scale(1.1)';
                }
                
                // Aloqa tugmasiga effekt
                const contactBtn = this.querySelector('.contact-btn');
                if (contactBtn) {
                    contactBtn.style.transform = 'scale(1.1)';
                    contactBtn.style.backgroundColor = '#4f46e5';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
                
                // Rasmni normal holatga qaytarish
                const tutorImage = this.querySelector('.tutor-image img');
                if (tutorImage) {
                    tutorImage.style.transform = '';
                }
                
                // Aloqa tugmasini normal holatga qaytarish
                const contactBtn = this.querySelector('.contact-btn');
                if (contactBtn) {
                    contactBtn.style.transform = '';
                    contactBtn.style.backgroundColor = '';
                }
            });
        });
    }
    
    // Statistika bo'limiga sichqoncha effekti
    const statisticsSection = document.getElementById('statistics');
    if (statisticsSection) {
        statisticsSection.addEventListener('mouseenter', function() {
            // Statistika kartochkalariga effekt
            const statCards = this.querySelectorAll('.statistic-card');
            statCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.transform = 'translateY(-15px) scale(1.05)';
                    card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
                    
                    // Ikonkaga effekt
                    const icon = card.querySelector('.statistic-icon i');
                    if (icon) {
                        icon.style.transform = 'scale(1.2) rotateY(180deg)';
                        icon.style.color = '#4f46e5';
                    }
                    
                    // Raqamga effekt
                    const number = card.querySelector('.statistic-number');
                    if (number) {
                        number.style.color = '#4f46e5';
                        number.style.textShadow = '0 0 10px rgba(79, 70, 229, 0.3)';
                    }
                }, index * 150);
            });
            
            // Grafik tablariga effekt
            const chartTabs = this.querySelectorAll('.chart-tab');
            chartTabs.forEach((tab, index) => {
                setTimeout(() => {
                    if (!tab.classList.contains('active')) {
                        tab.style.transform = 'translateY(-5px)';
                        tab.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                    }
                }, index * 100);
            });
            
            // Grafik konteyneriga effekt
            const chartContainer = this.querySelector('.chart-container');
            if (chartContainer) {
                chartContainer.style.transform = 'scale(1.02)';
                chartContainer.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
            }
        });
        
        statisticsSection.addEventListener('mouseleave', function() {
            // Statistika kartochkalarini normal holatga qaytarish
            const statCards = this.querySelectorAll('.statistic-card');
            statCards.forEach(card => {
                card.style.transform = '';
                card.style.boxShadow = '';
                
                // Ikonkani normal holatga qaytarish
                const icon = card.querySelector('.statistic-icon i');
                if (icon) {
                    icon.style.transform = '';
                    icon.style.color = '';
                }
                
                // Raqamni normal holatga qaytarish
                const number = card.querySelector('.statistic-number');
                if (number) {
                    number.style.color = '';
                    number.style.textShadow = '';
                }
            });
            
            // Grafik tablarini normal holatga qaytarish
            const chartTabs = this.querySelectorAll('.chart-tab');
            chartTabs.forEach(tab => {
                if (!tab.classList.contains('active')) {
                    tab.style.transform = '';
                    tab.style.boxShadow = '';
                }
            });
            
            // Grafik konteynerini normal holatga qaytarish
            const chartContainer = this.querySelector('.chart-container');
            if (chartContainer) {
                chartContainer.style.transform = '';
                chartContainer.style.boxShadow = '';
            }
        });
        
        // Grafik tablariga alohida effekt
        const chartTabs = statisticsSection.querySelectorAll('.chart-tab');
        chartTabs.forEach(tab => {
            tab.addEventListener('mouseenter', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateY(-5px) scale(1.05)';
                    this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
                }
            });
            
            tab.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = '';
                    this.style.boxShadow = '';
                }
            });
        });
    }
    
    // Ro'yxatdan o'tish bo'limiga sichqoncha effekti
    const registrationSection = document.getElementById('registration');
    if (registrationSection) {
        // Form elementlariga effekt
        const formGroups = registrationSection.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(10px)';
                this.style.borderLeft = '3px solid #4f46e5';
                
                // Label effekti
                const label = this.querySelector('label');
                if (label) {
                    label.style.color = '#4f46e5';
                    label.style.transform = 'translateX(5px)';
                }
                
                // Input effekti
                const input = this.querySelector('input, select, textarea');
                if (input) {
                    input.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
                }
            });
            
            group.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.borderLeft = '';
                
                // Label normal holatga qaytarish
                const label = this.querySelector('label');
                if (label) {
                    label.style.color = '';
                    label.style.transform = '';
                }
                
                // Input normal holatga qaytarish
                const input = this.querySelector('input, select, textarea');
                if (input) {
                    input.style.boxShadow = '';
                }
            });
        });
        
        // To'lov rejasi kartochkalariga effekt
        const subscriptionCards = registrationSection.querySelectorAll('.subscription-card');
        subscriptionCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                if (this.classList.contains('premium')) {
                    this.style.transform = 'translateY(-20px) scale(1.1)';
                    this.style.boxShadow = '0 30px 60px rgba(79, 70, 229, 0.2)';
                    
                    // Badge effekti
                    const badge = this.querySelector('.subscription-badge');
                    if (badge) {
                        badge.style.transform = 'rotate(10deg) scale(1.1)';
                        badge.style.boxShadow = '0 5px 10px rgba(0, 0, 0, 0.1)';
                    }
                } else if (this.classList.contains('free')) {
                    this.style.transform = 'translateY(-15px) scale(1.05)';
                    this.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.2)';
                    
                    // Badge effekti
                    const badge = this.querySelector('.subscription-badge');
                    if (badge) {
                        badge.style.transform = 'rotate(-10deg) scale(1.1)';
                        badge.style.boxShadow = '0 5px 10px rgba(0, 0, 0, 0.1)';
                    }
                } else {
                    this.style.transform = 'translateY(-15px)';
                    this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
                }
                
                // Narx effekti
                const price = this.querySelector('.price');
                if (price) {
                    price.style.transform = 'scale(1.1)';
                    price.style.color = '#4f46e5';
                }
                
                // Ro'yxat effekti
                const list = this.querySelector('ul');
                if (list) {
                    const items = list.querySelectorAll('li');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.transform = 'translateX(10px)';
                            item.style.color = '#4f46e5';
                        }, index * 100);
                    });
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = this.classList.contains('premium') ? 'scale(1.05)' : '';
                this.style.boxShadow = '';
                
                // Badge normal holatga qaytarish
                const badge = this.querySelector('.subscription-badge');
                if (badge) {
                    badge.style.transform = '';
                    badge.style.boxShadow = '';
                }
                
                // Narx normal holatga qaytarish
                const price = this.querySelector('.price');
                if (price) {
                    price.style.transform = '';
                    price.style.color = '';
                }
                
                // Ro'yxat normal holatga qaytarish
                const list = this.querySelector('ul');
                if (list) {
                    const items = list.querySelectorAll('li');
                    items.forEach(item => {
                        item.style.transform = '';
                        item.style.color = '';
                    });
                }
            });
        });
        
        // Ro'yxatdan o'tish tugmasiga effekt
        const submitBtn = registrationSection.querySelector('.registration-form-submit');
        if (submitBtn) {
            submitBtn.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.boxShadow = '0 10px 20px rgba(79, 70, 229, 0.3)';
                
                // Ikonka effekti
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'rotate(360deg)';
                }
            });
            
            submitBtn.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
                
                // Ikonka normal holatga qaytarish
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = '';
                }
            });
        }
    }
    
    // Resurslar bo'limiga sichqoncha effekti
    const resourcesSection = document.getElementById('resources');
    if (resourcesSection) {
        // Resurs kartochkalariga effekt
        const resourceCards = resourcesSection.querySelectorAll('.resource-card');
        resourceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) rotateY(5deg)';
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                
                // Rasm effekti
                const image = this.querySelector('.resource-image img');
                if (image) {
                    image.style.transform = 'scale(1.1)';
                }
                
                // Tugma effekti
                const button = this.querySelector('.primary-btn');
                if (button) {
                    button.style.transform = 'scale(1.1)';
                    button.style.backgroundColor = '#4f46e5';
                }
                
                // Narx effekti
                const price = this.querySelector('.resource-price');
                if (price) {
                    price.style.transform = 'scale(1.1)';
                    price.style.color = '#4f46e5';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
                
                // Rasm normal holatga qaytarish
                const image = this.querySelector('.resource-image img');
                if (image) {
                    image.style.transform = '';
                }
                
                // Tugma normal holatga qaytarish
                const button = this.querySelector('.primary-btn');
                if (button) {
                    button.style.transform = '';
                    button.style.backgroundColor = '';
                }
                
                // Narx normal holatga qaytarish
                const price = this.querySelector('.resource-price');
                if (price) {
                    price.style.transform = '';
                    price.style.color = '';
                }
            });
        });
    }
    
    // Biz haqimizda bo'limiga sichqoncha effekti
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        aboutSection.addEventListener('mouseenter', function() {
            // Matn qismiga effekt
            const aboutText = this.querySelector('.about-text');
            if (aboutText) {
                aboutText.style.transform = 'translateX(10px)';
                
                // Sarlavhaga effekt
                const heading = aboutText.querySelector('h3');
                if (heading) {
                    heading.style.color = '#4f46e5';
                    heading.style.textShadow = '0 0 10px rgba(79, 70, 229, 0.3)';
                }
                
                // Ro'yxat elementlariga effekt
                const listItems = aboutText.querySelectorAll('ul li');
                listItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.transform = 'translateX(10px)';
                        item.style.color = '#4f46e5';
                    }, index * 100);
                });
            }
            
            // Rasm qismiga effekt
            const aboutImage = this.querySelector('.about-image img');
            if (aboutImage) {
                aboutImage.style.transform = 'scale(1.05) rotate(2deg)';
                aboutImage.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
            }
        });
        
        aboutSection.addEventListener('mouseleave', function() {
            // Matn qismini normal holatga qaytarish
            const aboutText = this.querySelector('.about-text');
            if (aboutText) {
                aboutText.style.transform = '';
                
                // Sarlavhani normal holatga qaytarish
                const heading = aboutText.querySelector('h3');
                if (heading) {
                    heading.style.color = '';
                    heading.style.textShadow = '';
                }
                
                // Ro'yxat elementlarini normal holatga qaytarish
                const listItems = aboutText.querySelectorAll('ul li');
                listItems.forEach(item => {
                    item.style.transform = '';
                    item.style.color = '';
                });
            }
            
            // Rasm qismini normal holatga qaytarish
            const aboutImage = this.querySelector('.about-image img');
            if (aboutImage) {
                aboutImage.style.transform = '';
                aboutImage.style.boxShadow = '';
            }
        });
    }
});
