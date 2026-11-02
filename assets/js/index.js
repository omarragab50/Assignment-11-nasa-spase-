// WRITE YOUR JS CODE HERE
const todaySpace = document.getElementById('today-in-space');
const Launches = document.getElementById('launches');
const planets = document.getElementById('planets');

const todayLink = document.querySelector('.nav-link[data-section="today-in-space"]');
const launchesLink = document.querySelector('.nav-link[data-section="launches"]');
const planetsLink = document.querySelector('.nav-link[data-section="planets"]');


// function LaunchesDisplay(){
//     Launches.classList.remove('hidden');
//     todaySpace.classList.add('hidden');
//     planets.classList.add('hidden');
// }

// function todaySpaceDisplay(){
//     todaySpace.classList.remove('hidden');
//     Launches.classList.add('hidden');
//     planets.classList.add('hidden');

// }

// function planetsDisplay(){
//     planets.classList.remove('hidden');
//     Launches.classList.add('hidden');
//     todaySpace.classList.add('hidden');
// }


launchesLink.addEventListener('click', function(){
    Launches.classList.remove('hidden');
    todaySpace.classList.add('hidden');
    planets.classList.add('hidden');
})
todayLink.addEventListener('click', function(){
    todaySpace.classList.remove('hidden');
    Launches.classList.add('hidden');
    planets.classList.add('hidden');
})
planetsLink.addEventListener('click', function(){
    planets.classList.remove('hidden');
    Launches.classList.add('hidden');
    todaySpace.classList.add('hidden');
})


const API_KEY = 'Q9pgCrFCTfr96FKmmqbkRWQK8brn6bpHL7FKkkzH'; 
const APOD_URL = 'https://api.nasa.gov/planetary/apod';

const todayImage = document.getElementById('apod-image');
const todayLoading = document.getElementById('apod-loading');
const TodayTitle = document.getElementById('apod-title');
const todayExplanation = document.getElementById('apod-explanation');
const todayCopyright = document.getElementById('apod-copyright');
const todayDateHeader = document.getElementById('apod-date');
const todayDateDetail = document.getElementById('apod-date-detail');
const todayDateInfo = document.getElementById('apod-date-info');
const todayMediaType = document.getElementById('apod-media-type');
const todayDateInput = document.getElementById('apod-date-input');
const todayDateLabel = document.querySelector('.date-input-wrapper span');
const todayDateBtn = document.getElementById('load-date-btn');
const todayApodBtn = document.getElementById('today-apod-btn');

function toISODate(d) {
  //بالتوقيت المحلي
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
    }

    function formatDate(dateStr) {
    // T00:00:00 عشان متتحركش اليوم بسبب الـ timezone
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
    }

    async function loadApod(date) {
    todayLoading.classList.remove('hidden');
    todayImage.classList.add('hidden');

    try {
        let url = `${APOD_URL}?api_key=${API_KEY}&thumbs=true`;
        if (date) url += `&date=${date}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data = await res.json();

        // لو اليوم فيديو، نعرض الـ thumbnail
        todayImage.src =
        data.media_type === 'video'
            ? data.thumbnail_url || './assets/images/placeholder.webp'
            : data.url;
        todayImage.alt = data.title;

        TodayTitle.textContent = data.title;
        todayExplanation.textContent = data.explanation;
        todayCopyright.textContent = data.copyright
        ? `© ${data.copyright.replace(/\n/g, ' ').trim()}`
        : 'Public domain';
        todayDateHeader.textContent = `Astronomy Picture of the Day - ${formatDate(data.date)}`;
        todayDateDetail.innerHTML = `<i class="far fa-calendar mr-2"></i>${data.date}`;
        todayDateInfo.textContent = data.date;
        todayMediaType.textContent = data.media_type === 'video' ? 'Video' : 'Image';
        todayDateLabel.textContent = formatDate(data.date);
    } catch (err) {
        console.error(err);
        TodayTitle.textContent = 'Could not load the image';
        todayExplanation.textContent = 'Something went wrong. Try another date or try again later.';
    } finally {
        todayLoading.classList.add('hidden');
        todayImage.classList.remove('hidden');
    }
    }

    // الإعدادات الأولية
    const todayStr = toISODate(new Date());
    todayDateInput.max = todayStr;
    todayDateInput.value = todayStr;
    todayDateLabel.textContent = formatDate(todayStr);

    todayDateInput.addEventListener('change', function () {
    if (todayDateInput.value) {
        todayDateLabel.textContent = formatDate(todayDateInput.value);
    }
    });

    todayDateBtn.addEventListener('click', function () {
    if (todayDateInput.value) {
        loadApod(todayDateInput.value);
    }
    });

    todayApodBtn.addEventListener('click', function () {
    todayDateInput.value = todayStr;
    todayDateLabel.textContent = formatDate(todayStr);
    loadApod();
    });

    loadApod(); 




    // ===== PLANETS =====
var PLANETS_URL = 'https://solar-system-opendata-proxy.vercel.app/api/planets';
var AU_KM = 149597870.7;
var EARTH_GRAVITY = 9.80665;

var planetsData = {};
var planetEls = {
    image: document.getElementById('planet-detail-image'),
    name: document.getElementById('planet-detail-name'),
    description: document.getElementById('planet-detail-description'),
    distance: document.getElementById('planet-distance'),
    radius: document.getElementById('planet-radius'),
    mass: document.getElementById('planet-mass'),
    density: document.getElementById('planet-density'),
    orbitalPeriod: document.getElementById('planet-orbital-period'),
    rotation: document.getElementById('planet-rotation'),
    moons: document.getElementById('planet-moons'),
    gravity: document.getElementById('planet-gravity'),
    discoverer: document.getElementById('planet-discoverer'),
    discoveryDate: document.getElementById('planet-discovery-date'),
    bodyType: document.getElementById('planet-body-type'),
    volume: document.getElementById('planet-volume'),
    facts: document.getElementById('planet-facts'),
    perihelion: document.getElementById('planet-perihelion'),
    aphelion: document.getElementById('planet-aphelion'),
    eccentricity: document.getElementById('planet-eccentricity'),
    inclination: document.getElementById('planet-inclination'),
    axialTilt: document.getElementById('planet-axial-tilt'),
    temp: document.getElementById('planet-temp'),
    escape: document.getElementById('planet-escape'),
    };

    // - دوال التنسيق -
    var SUPERSCRIPT = {
    0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴',
    5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '-': '⁻',
    };

    function sup(n) {
    var text = String(n);
    var result = '';
    for (var i = 0; i < text.length; i++) {
        result += SUPERSCRIPT[text[i]] || text[i];
    }
    return result;
    }

    function fmt(n, digits) {
    if (digits === undefined) digits = 2;
    return Number(n).toLocaleString('en-US', { maximumFractionDigits: digits });
    }

    function formatOrbit(days) {
    if (days >= 730) {
        return fmt(days / 365.25, 1) + ' years';
    }
    return fmt(days, 1) + ' days';
    }

    function formatRotation(hours) {
    var h = Math.abs(hours);
    var text = h >= 48 ? fmt(h / 24, 1) + ' days' : fmt(h, 2) + ' hours';
    return hours < 0 ? text + ' (retrograde)' : text;
    }

    function formatTemp(kelvin) {
    return kelvin > 0 ? fmt(kelvin - 273.15, 0) + '°C' : 'N/A';
    }

    function getMoonCount(planet) {
    return Array.isArray(planet.moons) ? planet.moons.length : 0;
    }

    // -- عرض كوكب --
    function showPlanet(key) {
    var p = planetsData[key];
    if (!p) return;

    var moonCount = getMoonCount(p);

    planetEls.image.src = p.image || './assets/images/' + key + '.png';
    planetEls.image.alt = p.englishName;
    planetEls.name.textContent = p.englishName;
    planetEls.description.textContent = p.description;

    planetEls.distance.textContent = fmt(p.semimajorAxis / 1e6, 1) + 'M km';
    planetEls.radius.textContent = fmt(p.meanRadius, 0) + ' km';
    planetEls.mass.textContent =
        fmt(p.mass.massValue) + ' × 10' + sup(p.mass.massExponent) + ' kg';
    planetEls.density.textContent = fmt(p.density) + ' g/cm³';
    planetEls.orbitalPeriod.textContent = formatOrbit(p.sideralOrbit);
    planetEls.rotation.textContent = formatRotation(p.sideralRotation);
    planetEls.moons.textContent = moonCount;
    planetEls.gravity.textContent = fmt(p.gravity) + ' m/s²';

    planetEls.discoverer.textContent = p.discoveredBy || 'Known since antiquity';
    planetEls.discoveryDate.textContent = p.discoveryDate || 'Ancient';
    planetEls.bodyType.textContent = p.type || p.bodyType;
    planetEls.volume.textContent =
        fmt(p.vol.volValue) + ' × 10' + sup(p.vol.volExponent) + ' km³';

    planetEls.perihelion.textContent = fmt(p.perihelion / 1e6, 1) + 'M km';
    planetEls.aphelion.textContent = fmt(p.aphelion / 1e6, 1) + 'M km';
    planetEls.eccentricity.textContent = p.eccentricity;
    planetEls.inclination.textContent = p.inclination + '°';
    planetEls.axialTilt.textContent = p.axialTilt + '°';
    planetEls.temp.textContent = formatTemp(p.avgTemp);
    planetEls.escape.textContent = fmt(p.escape / 1000, 1) + ' km/s';

    renderFacts(p, moonCount);
    }

    function renderFacts(p, moonCount) {
    var facts = [
        fmt(p.semimajorAxis / AU_KM) + ' AU from the Sun',
        'Gravity is ' + fmt(p.gravity / EARTH_GRAVITY) + "× Earth's",
        'One year lasts ' + formatOrbit(p.sideralOrbit) + ' (Earth time)',
        moonCount > 0
        ? 'Has ' + moonCount + ' known moon' + (moonCount > 1 ? 's' : '')
        : 'Has no moons',
    ];

    var html = '';
    for (var i = 0; i < facts.length; i++) {
        html +=
        '<li class="flex items-start">' +
        '<i class="fas fa-check text-green-400 mt-1 mr-2"></i>' +
        '<span class="text-slate-300">' + facts[i] + '</span>' +
        '</li>';
    }
    planetEls.facts.innerHTML = html;
    }

    // -- تحميل البيانات -
    async function loadPlanets() {
    try {
        var res = await fetch(PLANETS_URL);
        if (!res.ok) throw new Error('Request failed: ' + res.status);
        var data = await res.json();

        for (var i = 0; i < data.bodies.length; i++) {
        var p = data.bodies[i];
        planetsData[p.englishName.toLowerCase()] = p;
        }

        showPlanet('earth');
    } catch (err) {
        console.error(err);
        planetEls.description.textContent =
        'Could not load planets data. Please try again later.';
    }
    }

    // - الضغط على الكروت -
    var planetCards = document.querySelectorAll('.planet-card');
    for (var c = 0; c < planetCards.length; c++) {
    planetCards[c].addEventListener('click', function () {
        showPlanet(this.dataset.planetId);
    });
    }

loadPlanets();








// == LAUNCHES ==
var LAUNCHES_URL = 'https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10';

var featuredBox = document.getElementById('featured-launch');
var launchesGrid = document.getElementById('launches-grid');
var launchesCount = document.getElementById('launches-count');
var launchesCountMobile = document.getElementById('launches-count-mobile');

var STATUS_COLORS = {
    Go: '#22c55e',
    TBC: '#eab308',
    TBD: '#3b82f6',
    Success: '#16a34a',
    Failure: '#ef4444',
    Hold: '#f97316',
    'In Flight': '#a855f7',
    };

    // دقة الموعد اللي تسمح بعرض الساعة
    var TIME_PRECISIONS = ['SEC', 'MIN', 'HR', 'H'];

    // دوال مساعدة 
    function esc(value) {
    return String(value == null ? '' : value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    function statusBadge(status, big) {
    var abbrev = status ? status.abbrev : 'N/A';
    var color = STATUS_COLORS[abbrev] || '#64748b';
    var size = big ? 'px-4 py-1.5 text-sm' : 'px-3 py-1 text-xs';
    return (
        '<span class="' + size + ' rounded-full font-semibold text-white" ' +
        'style="background-color:' + color + '">' + esc(abbrev) + '</span>'
    );
    }

    function getPrecision(launch) {
    return launch.net_precision ? launch.net_precision.abbrev : 'MIN';
    }

    function formatLaunchDate(launch) {
    var d = new Date(launch.net);
    var precision = getPrecision(launch);
    var isExact = precision === 'DAY' || TIME_PRECISIONS.indexOf(precision) !== -1;

    if (!isExact) {
        return d.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
        });
    }
    return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
    });
    }

    function formatLaunchTime(launch) {
    if (TIME_PRECISIONS.indexOf(getPrecision(launch)) === -1) {
        return 'TBD';
    }
    var time = new Date(launch.net).toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'UTC',
    });
    return time + ' UTC';
    }

    function daysUntil(isoDate) {
    var diff = new Date(isoDate).getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / 86400000));
    }

    function getProvider(l) {
    return l.launch_service_provider ? l.launch_service_provider.name : 'Unknown';
    }

    function getRocket(l) {
    var config = l.rocket ? l.rocket.configuration : null;
    return config ? config.full_name || config.name : 'Unknown';
    }

    function getLocation(l) {
    return l.pad && l.pad.location ? l.pad.location.name : 'Unknown';
    }

    function getCountry(l) {
    return l.pad && l.pad.country ? l.pad.country.alpha_3_code : 'N/A';
    }

    function getImage(l) {
    return l.image ? l.image.image_url : null;
    }

    function pickFeatured(list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].status && list[i].status.abbrev === 'Go') {
        return list[i];
        }
    }
    return list[0];
    }

    // -- بناء الكروت ---
    function buildCard(l) {
    var imageUrl = getImage(l);
    var visual = imageUrl
        ? '<img src="' + esc(imageUrl) + '" alt="' + esc(l.name) + '" class="w-full h-full object-cover" loading="lazy">'
        : '<i class="fas fa-rocket text-5xl text-slate-700"></i>';

    return `
        <div class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer">
        <div class="relative h-48 bg-slate-900/50 flex items-center justify-center">
            ${visual}
            <div class="absolute top-3 right-3">${statusBadge(l.status, false)}</div>
        </div>
        <div class="p-5">
            <div class="mb-3">
            <h4 class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">${esc(l.name)}</h4>
            <p class="text-sm text-slate-400 flex items-center gap-2">
                <i class="fas fa-building text-xs"></i>
                ${esc(getProvider(l))}
            </p>
            </div>
            <div class="space-y-2 mb-4">
            <div class="flex items-center gap-2 text-sm">
                <i class="fas fa-calendar text-slate-500 w-4"></i>
                <span class="text-slate-300">${esc(formatLaunchDate(l))}</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
                <i class="fas fa-clock text-slate-500 w-4"></i>
                <span class="text-slate-300">${esc(formatLaunchTime(l))}</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
                <i class="fas fa-rocket text-slate-500 w-4"></i>
                <span class="text-slate-300">${esc(getRocket(l))}</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
                <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                <span class="text-slate-300 line-clamp-1">${esc(getLocation(l))}</span>
            </div>
            </div>
            <div class="flex items-center gap-2 pt-4 border-t border-slate-700">
            <button class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold">Details</button>
            <button class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                <i class="far fa-heart"></i>
            </button>
            </div>
        </div>
        </div>`;
    }

    function buildFeatured(l) {
    var imageUrl = getImage(l);
    var visual = imageUrl
        ? '<img src="' + esc(imageUrl) + '" alt="' + esc(l.name) + '" class="absolute inset-0 w-full h-full object-cover">'
        : '<div class="flex items-center justify-center h-full min-h-[400px] bg-slate-800"><i class="fas fa-rocket text-9xl text-slate-700/50"></i></div>';

    var description =
        l.mission && l.mission.description
        ? l.mission.description
        : 'No description available yet.';

    return `
        <div class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all">
        <div class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
            <div class="flex flex-col justify-between">
            <div>
                <div class="flex items-center gap-3 mb-4">
                <span class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2">
                    <i class="fas fa-star"></i>
                    Featured Launch
                </span>
                ${statusBadge(l.status, true)}
                </div>
                <h3 class="text-3xl font-bold mb-3 leading-tight">${esc(l.name)}</h3>
                <div class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400">
                <div class="flex items-center gap-2">
                    <i class="fas fa-building"></i>
                    <span>${esc(getProvider(l))}</span>
                </div>
                <div class="flex items-center gap-2">
                    <i class="fas fa-rocket"></i>
                    <span>${esc(getRocket(l))}</span>
                </div>
                </div>
                <div class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6">
                <i class="fas fa-clock text-2xl text-blue-400"></i>
                <div>
                    <p class="text-2xl font-bold text-blue-400">${daysUntil(l.net)}</p>
                    <p class="text-xs text-slate-400">Days Until Launch</p>
                </div>
                </div>
                <div class="grid xl:grid-cols-2 gap-4 mb-6">
                <div class="bg-slate-900/50 rounded-xl p-4">
                    <p class="text-xs text-slate-400 mb-1 flex items-center gap-2"><i class="fas fa-calendar"></i>Launch Date</p>
                    <p class="font-semibold">${esc(formatLaunchDate(l))}</p>
                </div>
                <div class="bg-slate-900/50 rounded-xl p-4">
                    <p class="text-xs text-slate-400 mb-1 flex items-center gap-2"><i class="fas fa-clock"></i>Launch Time</p>
                    <p class="font-semibold">${esc(formatLaunchTime(l))}</p>
                </div>
                <div class="bg-slate-900/50 rounded-xl p-4">
                    <p class="text-xs text-slate-400 mb-1 flex items-center gap-2"><i class="fas fa-map-marker-alt"></i>Location</p>
                    <p class="font-semibold text-sm">${esc(getLocation(l))}</p>
                </div>
                <div class="bg-slate-900/50 rounded-xl p-4">
                    <p class="text-xs text-slate-400 mb-1 flex items-center gap-2"><i class="fas fa-globe"></i>Country</p>
                    <p class="font-semibold">${esc(getCountry(l))}</p>
                </div>
                </div>
                <p class="text-slate-300 leading-relaxed mb-6">${esc(description)}</p>
            </div>
            <div class="flex flex-col md:flex-row gap-3">
                <button class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2">
                <i class="fas fa-info-circle"></i>
                View Full Details
                </button>
                <div class="icons self-end md:self-center">
                <button class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"><i class="far fa-heart"></i></button>
                <button class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"><i class="fas fa-bell"></i></button>
                </div>
            </div>
            </div>
            <div class="relative">
            <div class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50">
                ${visual}
                <div class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"></div>
            </div>
            </div>
        </div>
        </div>`;
    }

    // ---- العرض ----
    function renderLaunches(list) {
    if (!list || list.length === 0) {
        featuredBox.innerHTML = '';
        launchesGrid.innerHTML =
        '<p class="col-span-full text-center text-slate-400 py-12">No upcoming launches found.</p>';
        return;
    }

    launchesCount.textContent = list.length + ' Launches';
    launchesCountMobile.textContent = list.length;

    var featured = pickFeatured(list);
    featuredBox.innerHTML = buildFeatured(featured);

    var html = '';
    for (var i = 0; i < list.length; i++) {
        if (list[i].id !== featured.id) {
        html += buildCard(list[i]);
        }
    }
    launchesGrid.innerHTML = html;
    }

    async function loadLaunches() {
    featuredBox.innerHTML = '';
    launchesGrid.innerHTML =
        '<p class="col-span-full text-center text-slate-400 py-12"><i class="fas fa-spinner fa-spin mr-2"></i>Loading launches...</p>';

    try {
        var res = await fetch(LAUNCHES_URL);
        if (!res.ok) throw new Error('Request failed: ' + res.status);
        var data = await res.json();
        renderLaunches(data.results);
    } catch (err) {
        console.error(err);
        launchesGrid.innerHTML =
        '<p class="col-span-full text-center text-red-400 py-12">Could not load launches. Please try again later.</p>';
    }
    }

loadLaunches();





var sidebar = document.getElementById('sidebar');
var sidebarToggle = document.getElementById('sidebar-toggle');
var sidebarOverlay = document.createElement('div');

sidebarOverlay.className = 'sidebar-overlay hidden';
document.body.appendChild(sidebarOverlay);

function openSidebar() {
    sidebar.classList.add('sidebar-open');
    sidebarOverlay.classList.remove('hidden');
}

function closeSidebar() {
    sidebar.classList.remove('sidebar-open');
    sidebarOverlay.classList.add('hidden');
}

sidebarToggle.addEventListener('click', function () {
    if (sidebar.classList.contains('sidebar-open')) {
        closeSidebar();
    } else {
        openSidebar();
    }
});

sidebarOverlay.addEventListener('click', function () {
    closeSidebar();
});