/* ═══════════════════════════════════════════════
   GALLERY — Dynamic grid with filtering + Lightbox
   ═══════════════════════════════════════════════ */

(function() {
  'use strict';

  const galleryData = [
    { id: 'I1',   title: 'Chen Wei — Character Master',  cat: 'character', desc: 'Four-view character reference for all helmet-on shots.',
      prompt: getI1Prompt() },
    { id: 'I2',   title: 'ARIA Console Display',          cat: 'scene',    desc: 'Three-screen NABU-7 interface reference.',
      prompt: getI2Prompt() },
    { id: 'I3',   title: 'Earth Ruins',                    cat: 'scene',    desc: 'Future Earth flashback — collapsed city under grey-green sky.',
      prompt: getI3Prompt() },
    { id: 'I5',   title: 'Movie Poster',                   cat: 'scene',    desc: 'Official film poster for THE LAST SIGNAL.',
      prompt: getI5Prompt() },
    { id: 'I14',  title: 'DO NOT REPLY Warning',           cat: 'scene',    desc: 'Red warning display on console.',
      prompt: getI14Prompt() },
    { id: 'I19',  title: 'Burnt Family Photo',             cat: 'scene',    desc: 'Emotional anchor — what was lost.',
      prompt: getI19Prompt() },
    { id: 'I23',  title: 'Chen Wei Face Master',           cat: 'character', desc: 'Face reference for helmet-off shots.',
      prompt: getI23Prompt() },
    { id: 'I24',  title: 'Chen Wei Helmet-Off Full Body',  cat: 'character', desc: 'Four-view, white background.',
      prompt: getI24Prompt() },
    { id: 'I30',  title: 'Rocket on Launch Pad',           cat: 'journey',  desc: 'Plasma spacecraft at twilight.',
      prompt: getI30Prompt() },
    { id: 'I31',  title: 'Rocket Lift-off',                cat: 'journey',  desc: 'Plasma ignition — blue-white exhaust.',
      prompt: getI31Prompt() },
    { id: 'I32',  title: 'Earth from Orbit',               cat: 'journey',  desc: 'Receding Earth — airglow layer.',
      prompt: getI32Prompt() },
    { id: 'I33',  title: 'Deep Space Spacecraft',          cat: 'journey',  desc: 'Interplanetary transit — star field.',
      prompt: getI33Prompt() },
    { id: 'I34',  title: 'Mars Approach',                  cat: 'journey',  desc: 'Cockpit POV — planet growing.',
      prompt: getI34Prompt() },
    { id: 'I35',  title: 'Mars Orbital View',              cat: 'journey',  desc: 'Full disc — Valles Marineris visible.',
      prompt: getI35Prompt() },
    { id: 'I36',  title: 'Departure — Helmet On',          cat: 'character', desc: 'Chen Wei putting on helmet in departure hall.',
      prompt: getI36Prompt() },
    { id: 'I15',  title: 'Mars Sunrise Panorama',          cat: 'scene',    desc: 'Final shot — golden dawn.',
      prompt: getI15Prompt() },
    { id: 'I40',  title: 'Farewell — Departure Hall',       cat: 'scene',    desc: 'Chen Wei parting with his family at the glass window.',
      prompt: getI40Prompt() },
    { id: 'I41',  title: 'Mission Briefing',                cat: 'scene',    desc: 'Commander briefing Chen Wei before departure.',
      prompt: getI41Prompt() },
    { id: 'I43',  title: 'NABU-7 Mars Base',                cat: 'scene',    desc: 'Exterior establishing shot of the Mars habitat.',
      prompt: getI43Prompt() },
    { id: 'I29',  title: 'Video Call — Family',             cat: 'scene',    desc: 'Wife and daughter on screen — the emotional climax.',
      prompt: getI29Prompt() },
  ];

  // ── Prompt functions (avoids inline string quot issues) ──
  function getI1Prompt() {
    return "Full-body character reference sheet of a sci-fi astronaut named Chen Wei, shown in four views on a pure white studio backdrop — front view (center), back view (far left), left side profile (center-left), right side profile (center-right). The central figure is a fully-enclosed white EVA spacesuit with a dark reflective visor. The suit has grey segmented joint rings at the shoulders, elbows, and knees. A small NABU-7 mission patch is visible on the left chest. The helmet is a smooth dome with no visible face features — the visor is a dark curved mirror reflecting the studio lighting. White background, professional three-point studio lighting. 85mm f/1.4 medium format telephoto. Deep focus. OUTPUT: 4:3 horizontal PNG, 4K. This is the master consistency anchor — every Veo 3.1 clip containing Chen Wei uses this image as img2img input.";
  }
  function getI2Prompt() {
    return "Multi-monitor console display system for a Mars base control room, designed as the visual consistency anchor for every screen interface shot in the film. The setup consists of three vertically-oriented dark-screen monitors mounted side by side on a brushed grey metal panel. The bezels are thin and dark grey. Below the monitors: a dark metal console surface. The screens currently display abstract waveform visualizations — horizontal green-blue lines with subtle pulsing animation implied. No text appears on any screen. The left screen shows a vertical timeline visualization. The right screen shows a hexagonal data grid. Ambient cool blue-white light from the screens. The overall aesthetic is functional, scientific, slightly retro-futuristic. OUTPUT: 16:9, PNG, 4K.";
  }
  function getI3Prompt() {
    return "Post-apocalyptic Earth landscape from mid-altitude. A dead city of collapsed skyscrapers under a grey-green overcast sky. No vegetation, no water, no movement. The buildings are rusted, crumbling, some partially collapsed into rubble. An enormous ring-shaped energy structure hangs in the sky — it is pale blue-white, translucent, with visible energy arcs. The light from the ring casts an eerie pale glow on the ruins below. The color palette is dominated by cold greys, rusty browns, and sickly green-grey clouds. Dust haze at mid-distance. CAMERA: Wide shot, eye level approximately 50m above ground. Deep depth of field — foreground rubble to distant ring structure. OUTPUT: 16:9, PNG, 4K.";
  }
  function getI5Prompt() {
    return "A cinematic movie poster for a science fiction short film titled THE LAST SIGNAL. Foreground: a tiny astronaut silhouette (back view, full figure) standing on a rocky Martian surface, facing a massive glowing sunrise on the horizon. The astronaut's shadow stretches toward the viewer. The sky is deep orange-gold at the horizon, transitioning to dark purple-blue at the top. Stars are visible in the upper atmosphere. The title THE LAST SIGNAL appears in large serif/cinematic font across the bottom third in white with a subtle gold glow. Tagline at the very bottom: One signal changes everything. The overall feel is epic, lonely, and cinematic. Poster dimensions: 2:3 vertical format. 4K resolution.";
  }
  function getI14Prompt() {
    return "A reference image of a screen red warning text display for use as img2img input in Veo 3.1 video generation. This is ARIA final warning to Chen Wei. SUBJECT: A rectangular dark screen with large bold monospaced red text DO NOT REPLY in all caps centered on the display. Below it in smaller red text: ANY RESPONSE CREATES A BIDIRECTIONAL CAUSAL LINK. EARTH COORDINATES WILL BE CALCULABLE. The red LED glow from the text spills onto the dark console surface below the screen, creating a subtle warm red ambient light. No other elements. The screen bezels are dark grey. SPATIAL: Close-up — the screen fills the frame. LIGHTING: The screen is self-illuminated — the red text is the only light source. The room around it is dark. OUTPUT: 16:9, PNG, 4K.";
  }
  function getI19Prompt() {
    return "A reference image for an AI-generated sci-fi film: a fire-damaged family photograph found in the ruins of a destroyed home. The photograph shows four people — two adults, two children — standing in front of a modest house with a tree. The top-right corner and bottom-left edge of the photo are charred and burned away, with the fire damage spreading inward. The faces of the two children are partially visible but damaged by heat and smoke stains. The photograph is slightly curled from heat exposure, lying on a surface of grey ash and debris. Soft diffuse light from above. Shallow depth of field — the photo is sharp, the ash background is soft. The burnt photo appears during the flashback sequence. OUTPUT: 16:9, PNG, 4K.";
  }
  function getI23Prompt() {
    return "A reference image for an AI-generated sci-fi film: close-up facial portrait of Chen Wei, used as the consistency anchor for every helmet-off shot in the film — the dialogue scene with ARIA, the video call home, and the final sunrise. SUBJECT: Medium close-up of an Asian male in his mid-40s. Short black hair, slightly disheveled with a visible horizontal indent across his forehead from the helmet seal. Two to three days of dark stubble along the jawline. A small pale scar approximately 1cm long above the right eyebrow — a detail that must be present in every frame. Dark brown eyes, tired but alert. His expression is neutral, serious — neither smiling nor frowning. The grey compression suit collar is visible around his neck with the metallic ring seal. The background is pure white. LIGHTING: Professional three-point portrait lighting — soft key light from the left, fill from the right, slight rim light on the hair and shoulders. OUTPUT: 16:9, PNG, 4K.";
  }
  function getI24Prompt() {
    return "A reference image for an AI-generated sci-fi film: full-body character sheet of Chen Wei without his helmet, four views on pure white background — front, back, left profile, right profile. The suit is identical to I1: white EVA suit with grey segmented joint rings at shoulders, elbows, and knees. The helmet collar ring is visible and open — the grey compression layer is exposed at the neck. His face matches I23 exactly — same stubble, same scar, same hair. The purpose of this reference is to provide a full-body anchor for all shots after he removes his helmet. White background, studio lighting, deep focus. OUTPUT: 4:3 horizontal (four evenly spaced views), PNG, 4K.";
  }
  function getI30Prompt() {
    return "A cinematic reference image: wide establishing shot of a single-stage-to-orbit spacecraft on a launch pad at twilight. The spacecraft is charcoal-black, sleek, with a sharp conical nose and smooth hull — no visible seams or panels. Sapphire-blue plasma exhaust glow is faintly visible from the engine nozzles at the base. The launch pad is a simple grey metal structure on a flat landscape. The sky is deep blue at the zenith, fading to warm orange-gold at the horizon. Thin atmospheric haze. The spacecraft is silhouetted against the twilight sky. CAMERA: Wide shot from ground level, 200m from the pad. 24mm equivalent, deep focus. OUTPUT: 16:9, PNG, 4K.";
  }
  function getI31Prompt() {
    return "A cinematic reference image: low-angle shot of the spacecraft lifting off. The plasma engines fire with brilliant blue-white exhaust, creating a symmetrical cone shape beneath the craft. The exhaust lights up the launch pad and surrounding ground with an intense blue-white glow. The spacecraft is ascending rapidly, already 50m above the pad. The sky is dark blue with thin clouds illuminated from below by the engine light. CAMERA: Low angle, wide shot. 24mm equivalent. Dynamic, powerful composition. OUTPUT: 16:9, PNG, 4K.";
  }
  function getI32Prompt() {
    return "A cinematic reference image: view from high orbit after stage separation. The curved Earth horizon fills the lower half of the frame — blue atmosphere with a thin white airglow layer along the edge. The spacecraft hull edge is visible at the bottom-left corner — the black carbon composite surface with a subtle blue cabin light reflection. The Earth is slowly receding, appearing smaller against the black of space. Stars are beginning to become visible in the upper frame as the craft moves away from Earth light pollution. CAMERA: External view from the spacecraft hull. 35mm equivalent. Deep focus. OUTPUT: 16:9, PNG, 4K.";
  }
  function getI33Prompt() {
    return "A cinematic reference image: exterior view of the spacecraft in deep space, mid-journey between Earth and Mars. The spacecraft is seen from the side — the black hull takes up the lower third of the frame. A single small window glows with warm blue cabin light. The star field behind is dense and clear — thousands of stars visible, no planets. The spacecraft hull is unmarked black carbon composite — no insignia, no name, no reflection. The only light is the faint blue window glow and the ambient starlight on the hull edges. CAMERA: Medium shot, side view. 50mm equivalent. Deep focus. OUTPUT: 16:9, PNG, 4K.";
  }
  function getI34Prompt() {
    return "A cinematic reference image: first-person POV from inside the cockpit, looking through a rectangular viewing window. Mars is growing in the window — a reddish-orange disc with subtle surface details (darker highland regions, lighter lowlands) becoming visible as the spacecraft approaches. The window frame is visible — dark grey metal with rounded corners. The instrument panel edge is visible at the bottom of frame. The cabin is dim — the only significant light is the Mars glow through the window casting a warm orange tint on the interior surfaces. CAMERA: POV — the window and panel frame the view. OUTPUT: 16:9, PNG, 4K.";
  }
  function getI35Prompt() {
    return "A cinematic reference image: wide orbital view of Mars from high orbit. The entire planet disc fills the frame — reddish-orange surface with darker volcanic regions and lighter cratered highlands. The Valles Marineris canyon system is visible as a dark gash stretching across the surface. A thin atmospheric haze layer is visible at the planetary limb — pale orange-brown. The sky above is black with scattered stars. The spacecraft hull is not visible — this is a pure establishing shot. CAMERA: Wide orbital view, 24mm equivalent. Deep focus. OUTPUT: 16:9, PNG, 4K.";
  }
  function getI36Prompt() {
    return "A cinematic reference image: Chen Wei standing in the departure preparation hall of the spaceport, moments before boarding the spacecraft. He is in his full white EVA suit, holding his helmet in both hands, raising it to seal it over his head. The helmet is mid-way — the bottom edge is level with his chin, his face still partially visible for the last time. Through the large floor-to-ceiling glass wall behind him: the charcoal-black spacecraft on its launch pad at twilight. The interior lighting is cool blue-white. The exterior through the glass is warm golden sunset. His posture is deliberate, calm — this is the last moment he is a face, not a helmet. CAMERA: Medium shot, chest to above head. The glass wall fills the background. 50mm equivalent. OUTPUT: 16:9, PNG, 4K.";
  }
  function getI15Prompt() {
    return "A cinematic reference image: wide angle Martian sunrise landscape — the FINAL SHOT of the film. The sun is a bright golden-white disc just above the horizon, casting warm horizontal light across the rocky plain. Long shadows stretch from every rock and stone toward the viewer. The sky transitions from bright orange-gold at the horizon to deep purple-black at the zenith. A few faint stars are still visible in the upper sky. In the distance, the silhouette of the NABU-7 base is barely visible — a low white dome shape against the bright horizon. The foreground is scattered with angular Martian rocks and fine reddish-brown dust. The entire frame is bathed in warm golden light. CAMERA: Extremely wide, 20mm equivalent. Deep focus. The composition is designed so that text (title sequence / credits) can be overlaid on the darker upper portion of the sky. OUTPUT: 16:9, PNG, 4K.";
  }
  function getI40Prompt() {
    return "A cinematic reference image for an AI-generated sci-fi film: the farewell scene at the spaceport departure hall. A large floor-to-ceiling glass window divides the frame into two worlds — the warm interior side where Chen Wei's wife and daughter stand, and the cold exterior side where the launch pad and spacecraft are visible at twilight. Chen Wei is already in his full white EVA suit, standing on the interior side. His wife presses her palm against the glass, her face lit by the warm interior light. His daughter presses her face to the glass, leaving a fog mark from her breath. On the other side of the glass: the charcoal-black spacecraft silhouetted against the twilight sky. The composition emphasizes the barrier between them — glass that separates their worlds. 50mm equivalent. Shallow depth of field focused on the family. OUTPUT: 16:9, PNG.";
  }
  function getI41Prompt() {
    return "A cinematic reference image for an AI-generated sci-fi film: the mission briefing room moments before departure. A senior commanding officer in dark blue dress uniform (late 50s, grey-white hair) stands beside a metal table with a holographic display showing Mars Base 28 — NABU-7. He points at a section of the base schematic. Across the table: Chen Wei in his white EVA suit, helmet under one arm, listening. The room is functional — grey metal walls, one small window showing the twilight launch pad. A tablet on the table shows the previous astronaut's file: Harrison, M. — STATUS: DEPARTED. The lighting is cool overhead, with warmer light from the holographic display illuminating both faces from below. CAMERA: Medium two-shot capturing both figures and the holographic map. 35mm equivalent. OUTPUT: 16:9, PNG.";
  }
  function getI43Prompt() {
    return "A reference image: NABU-7 Mars Base. A white semi-cylindrical dome habitat on a reddish-brown plain under a pale orange sky. Large dark rectangular windows along the front. A smaller connecting dome beside the main habitat. Two dish antennas — one large, one small — stand beside the base. Solar panel fields stretch to the right. The ground is scattered with angular red-brown rocks. In the distance: low eroded Martian hills under a thin atmosphere haze. The base looks functional, scientific, isolated. CAMERA: Wide establishing shot from ground level. 24mm equivalent. Deep focus. OUTPUT: 16:9, PNG.";
  }
  function getI29Prompt() {
    return "The POV of a video call screen showing Chen Wei's family on Earth: a woman (early 40s, Asian, long dark hair tied back, cream sweater) and her young daughter (approximately 7, missing front tooth, holding a stuffed rabbit) stand in a warm sunlit kitchen. The kitchen behind them has pale yellow walls, a wooden table with a small vase of flowers, and a window letting in golden afternoon light. They are waving at the camera, smiling — the woman has tears in her eyes but is trying to be strong. The daughter is bouncing slightly, excited. The image is slightly compressed, as if from a webcam — subtle digital artifacts, warm color grade, soft focus at the edges. This is the warmest, most colorful, most human image in the entire film — the direct visual opposite of the cold Mars base interior. OUTPUT: 16:9, PNG. Used in R28d as the video call screen content for the film's climactic emotional moment.";
  }

  const grid = document.getElementById('gallery-grid');

  // ── Lightbox elements (3D flip card) ──
  const lightbox = document.createElement('div');
  lightbox.className = 'gallery-lightbox';
  lightbox.innerHTML = [
    '<div class="lightbox-bg"></div>',
    '<div class="lightbox-content">',
      '<button class="lightbox-close">&times;</button>',
      '<div class="lightbox-card" id="lightbox-card">',
        '<div class="lightbox-card-inner">',
          '<div class="lightbox-card-front">',
            '<div class="lightbox-image"><div class="lightbox-placeholder"></div></div>',
            '<div class="lightbox-info">',
              '<div class="lightbox-id"></div>',
              '<div class="lightbox-title"></div>',
              '<div class="lightbox-desc"></div>',
            '</div>',
          '</div>',
          '<div class="lightbox-card-back">',
            '<div class="lightbox-back-content">',
              '<div class="lightbox-back-label">Key Frame · Generation Prompt</div>',
              '<div class="lightbox-back-id" style="text-align:center;margin-bottom:0.5rem;"></div>',
              '<div class="lightbox-back-cat" style="text-align:center;"></div>',
              '<div class="lightbox-back-divider" style="margin:0.6rem auto;"></div>',
              '<div class="lightbox-back-prompt" style="font-size:0.68rem;line-height:1.6;color:var(--on-primary-muted);white-space:pre-wrap;"></div>',
              '<div class="lightbox-back-hint" style="text-align:center;margin-top:1rem;">Click to flip back</div>',
            '</div>',
          '</div>',
        '</div>',
      '</div>',
      '<div class="lightbox-nav">',
        '<button class="lightbox-prev">&#10094;</button>',
        '<button class="lightbox-next">&#10095;</button>',
      '</div>',
      '<div class="lightbox-flip-hint">Click card to flip</div>',
    '</div>'
  ].join('\n');
  document.body.appendChild(lightbox);

  // ── Cache lightbox elements ──
  var lbBg = lightbox.querySelector('.lightbox-bg');
  var lbClose = lightbox.querySelector('.lightbox-close');
  var lbPlaceholder = lightbox.querySelector('.lightbox-placeholder');
  var lbId = lightbox.querySelector('.lightbox-id');
  var lbTitle = lightbox.querySelector('.lightbox-title');
  var lbDesc = lightbox.querySelector('.lightbox-desc');
  var lbPrev = lightbox.querySelector('.lightbox-prev');
  var lbNext = lightbox.querySelector('.lightbox-next');
  var lbCard = document.getElementById('lightbox-card');
  var lbBackId = lightbox.querySelector('.lightbox-back-id');
  var lbBackCat = lightbox.querySelector('.lightbox-back-cat');
  var lbBackPrompt = lightbox.querySelector('.lightbox-back-prompt');
  var currentIndex = -1;
  var currentFiltered = [];

  var isTransitioning = false;

  function openLightbox(index, direction) {
    var item = currentFiltered[index];
    if (!item || isTransitioning) return;
    currentIndex = index;
    isTransitioning = true;
    lbCard.classList.remove('flipped');

    // Slide transition
    var front = lbCard.querySelector('.lightbox-card-front');
    if (direction) {
      var slideOut = direction === 1 ? 'translateX(-30px)' : 'translateX(30px)';
      front.style.transition = 'transform 0.25s ease-out, opacity 0.25s ease-out';
      front.style.transform = slideOut;
      front.style.opacity = '0';
      setTimeout(function() {
        updateContent(item);
        front.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
        front.style.transform = direction === 1 ? 'translateX(30px)' : 'translateX(-30px)';
        front.style.opacity = '0';
        // Force reflow then animate in
        void front.offsetHeight;
        front.style.transform = 'translateX(0)';
        front.style.opacity = '1';
        setTimeout(function() { isTransitioning = false; }, 350);
      }, 250);
    } else {
      updateContent(item);
      isTransitioning = false;
    }

    lbPrev.style.visibility = currentIndex > 0 ? 'visible' : 'hidden';
    lbNext.style.visibility = currentIndex < currentFiltered.length - 1 ? 'visible' : 'hidden';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function updateContent(item) {
    lbId.textContent = item.id;
    lbTitle.textContent = item.title;
    lbDesc.textContent = item.desc;
    lbPlaceholder.style.background = 'none';
    lbPlaceholder.innerHTML = '<img src="assets/images/keyframes/' + item.id + '.png" style="width:100%;height:100%;object-fit:contain;" alt="' + item.id + '" onerror="this.outerHTML=\'<span style=\\\\\'font-family:Orbitron,sans-serif;font-size:3rem;color:rgba(255,255,255,0.12);\\\\\'>' + item.id + '</span>\'">';
    lbBackId.textContent = item.id + ' \u00b7 ' + item.title;
    lbBackCat.textContent = item.cat.charAt(0).toUpperCase() + item.cat.slice(1) + ' \u00b7 ChatGPT Image 2 / Nano Banana Pro';
    lbBackPrompt.textContent = item.prompt || item.desc;
    lbPrev.style.visibility = currentIndex > 0 ? 'visible' : 'hidden';
    lbNext.style.visibility = currentIndex < currentFiltered.length - 1 ? 'visible' : 'hidden';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    currentIndex = -1;
  }

  function navigate(direction) {
    var next = currentIndex + direction;
    if (next >= 0 && next < currentFiltered.length) {
      openLightbox(next, direction);
    }
  }

  // ── 3D flip ──
  lbCard.addEventListener('click', function() {
    lbCard.classList.toggle('flipped');
  });

  // ── Lightbox events ──
  lbClose.addEventListener('click', closeLightbox);
  lbBg.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', function() { navigate(-1); });
  lbNext.addEventListener('click', function() { navigate(1); });
  document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  // ── Build gallery ──
  function render(filter) {
    filter = filter || 'all';
    var filtered = filter === 'all' ? galleryData : galleryData.filter(function(item) { return item.cat === filter; });
    currentFiltered = filtered;

    grid.innerHTML = '';
    var gradients = {
      character: 'linear-gradient(135deg, #0F1B3D, #1A73E8)',
      scene: 'linear-gradient(135deg, #12141A, #CC5533)',
      journey: 'linear-gradient(135deg, #07080A, #1A73E8)',
    };

    filtered.forEach(function(item, i) {
      var el = document.createElement('div');
      el.className = 'gal-item';
      el.dataset.reveal = 'fade-up';
      el.dataset.delay = String(Math.min(i * 0.05, 0.4));

      el.innerHTML = '' +
        '<div class=\"gal-item-img\" style=\"display:flex;align-items:center;justify-content:center;background:#0A0B0E;\">' +
          '<img src=\"assets/images/keyframes/' + item.id + '.png" style=\"width:100%;height:100%;object-fit:cover;\" alt=\"' + item.id + '\" onerror=\"this.style.display=\'none\';this.nextSibling.style.display=\'flex\'\"><span style=\"display:none;font-family:Orbitron,sans-serif;font-size:2.5rem;color:rgba(255,255,255,0.12);\">' + item.id + '</span>' +
        '</div>' +
        '<div class=\"gal-item-overlay\">' +
          '<div class=\"gal-item-label\">' + item.id + ' \u00b7 ' + item.cat + '</div>' +
          '<div class=\"gal-item-desc\">' + item.title + '</div>' +
        '</div>';

      el.addEventListener('click', (function(idx) { return function() { openLightbox(idx, 0); }; })(i));
      el.style.cursor = 'pointer';
      grid.appendChild(el);
    });

    // Observe new items
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    var items = document.querySelectorAll('.gal-item');
    for (var j = 0; j < items.length; j++) {
      observer.observe(items[j]);
    }
  }

  // ── Filter tabs ──
  var tabs = document.querySelectorAll('.gal-tab');
  for (var t = 0; t < tabs.length; t++) {
    tabs[t].addEventListener('click', function() {
      var allTabs = document.querySelectorAll('.gal-tab');
      for (var a = 0; a < allTabs.length; a++) allTabs[a].classList.remove('active');
      this.classList.add('active');
      closeLightbox();
      render(this.dataset.filter);
    });
  }

  render('all');
})();
