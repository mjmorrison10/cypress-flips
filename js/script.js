// --- INVENTORY DATABASE ---
let inventory = [
    {
        id: 'zoro-king-of-artist',
        title: 'Roronoa Zoro - King of Artist (Wano Kuni)',
        category: 'Action Figure',
        price: 40.00,
        shortDesc: "Collector's grade Banpresto piece. Dynamic pose, high-fidelity sculpt, and near-mint condition.",
        fullDesc: "The Banpresto 'King of Artist' series is renowned for its superior sculpting and paint accuracy, and this Roronoa Zoro piece is no exception. Capturing Zoro in his iconic Wano Kuni attire, this figure features a dynamic, powerful crouch that brings the intensity of the arc to life. <br><br>From the intricate patterns on his kimono to the sharp detail on his three katanas, every element is rendered with precision. This specific unit has been meticulously inspected and is in near-mint condition, making it an essential acquisition for any serious One Piece collector or anime enthusiast. A true statement piece that commands attention on any shelf.",
        images: [
            'images/action figure/zoro_action_figure_front.jpg',
            'images/action figure/zoro_action_figure_1.jpg',
            'images/action figure/zoro_action_figure_2.jpg',
            'images/action figure/zoro_action_figure_back.jpg'
        ],
        isPremium: true
    },
    {
        id: 'itadori-king-of-artist',
        title: 'Yuji Itadori - King of Artist (Jujutsu Kaisen)',
        category: 'Action Figure',
        price: 20.00,
        shortDesc: "High-energy action pose. Near-mint condition with vibrant colors. A must-have for JJK fans.",
        fullDesc: "Bring the energy of Jujutsu Kaisen to your collection with this Banpresto 'King of Artist' Yuji Itadori figure. This piece captures Itadori in a high-intensity action pose, perfectly embodying his strength and determination. <br><br>Condition: Near-Mint. This figure has been carefully maintained. The paint is crisp, the sculpt is sharp, and the colors—especially the signature red scarf and boots—are vibrant and unfaded. No visible scuffs, chips, or defects. Whether you're a seasoned collector or just starting your JJK journey, this high-fidelity sculpt is a fantastic addition at an unbeatable price.",
        images: [
            'images/action figure/Itadori_front.jpg',
            'images/action figure/Itadori_1.jpg',
            'images/action figure/Itadori_back.jpg'
        ],
        isPremium: false
    },
    {
        id: 'charlotte-katakuri-best-of-the-buddy',
        title: 'Ichibansho Figure - One Piece - Charlotte Katakuri (Best of the Buddy)',
        category: 'Action Figure',
        price: 35.00,
        shortDesc: "Dynamic high-kick Katakuri statue with clear display stand. Bold shelf presence with light display wear.",
        fullDesc: "Bring serious Whole Cake Island energy to your One Piece collection with this Bandai Spirits Ichibansho Charlotte Katakuri figure from the Best of the Buddy line. The sculpt captures Katakuri in a dramatic airborne kick pose, giving the piece a strong sense of motion and a much bigger shelf presence than a standard standing figure. The clear display stand helps create that suspended action effect, while the detailed tattoos, spiked accessories, belt accents, and confident expression make this a standout piece for any One Piece fan. <br><br>Condition: Good display condition. Compared with a mint-condition example, this figure shows light signs of previous display and handling. The figure itself presents very well overall, with strong color, clean body paint, intact spikes/accessories, and no major breaks or missing pieces visible in the photos. The clear base/stand does show typical light surface wear, small scuffs, and minor dust/marks from display. There may also be very small paint rubs or handling marks on the darker glossy areas, but nothing that takes away from the overall impact when displayed. <br><br>This is a great value pick for collectors who want an eye-catching Katakuri statue without paying mint-in-box pricing. It is display-ready, full of motion, and priced fairly for its condition. Includes the clear display base/stand shown in the photos.",
        images: [
            'images/action figure/Katakuri_main.jpg',
            'images/action figure/Katakuri_front.jpg',
            'images/action figure/Katakuri_1.jpg',
            'images/action figure/Katakuri_2.jpg',
            'images/action figure/Katakuri_3.jpg',
            'images/action figure/Katakuri_back.jpg'
        ],
        isPremium: false
    },
    {
        id: 'wwe-knuckle-crunchers-cody-rhodes',
        title: 'WWE Knuckle Crunchers - “The American Nightmare” Cody Rhodes Figure',
        category: 'Action Figure',
        price: 15.00,
        shortDesc: "Unopened Mattel WWE Knuckle Crunchers Cody Rhodes figure with barbell and weight belt accessories. Great display/play piece with packaging wear.",
        fullDesc: "Bring home \"The American Nightmare\" with this Mattel WWE Knuckle Crunchers Cody Rhodes figure. This compact 3.5-inch style figure is built for quick, over-the-top WWE play action and comes packaged with the themed barbell and weight belt accessories shown on the box. The packaging has strong shelf presence with bold Cody Rhodes artwork, WWE branding, and colorful Knuckle Crunchers graphics that make it a fun pickup for WWE fans, young collectors, or anyone building out a wrestling figure display. <br><br><strong>Condition:</strong> New in package / unopened from Walmart clearance stock, but not mint-card condition. Compared with a collector-grade mint example, the packaging shows visible retail shelf wear, edge/corner wear, creasing/bending on the cardboard, and a large Walmart clearance sticker on the front/right side panel. The plastic window appears intact from the photos, and the figure/accessories appear sealed inside. Because of the visible clearance sticker and packaging wear, this is priced as a display/play-value piece rather than a pristine sealed collector item. <br><br>Retail availability appears limited, and this specific Knuckle Crunchers Cody Rhodes figure is harder to find casually on shelves now. If you want an affordable Cody Rhodes WWE figure with accessories and do not need perfect packaging, this is a strong value pickup at a fair local price.",
        images: [
            'images/action figure/Cody-front.jpg',
            'images/action figure/Cody-1.jpg',
            'images/action figure/Cody-2.jpg',
            'images/action figure/Cody-back.jpg'
        ],
        isPremium: false
    },
    {
        id: 'megumi-fushiguro-statue',
        title: 'Banpresto - Jujutsu Kaisen - Megumi Fushiguro Statue',
        category: 'Action Figure',
        price: 25.00,
        shortDesc: "Sharp Megumi display statue in a focused crouching pose. Great shelf presence with light visible wear.",
        fullDesc: "Add Megumi Fushiguro to your Jujutsu Kaisen lineup with this striking Banpresto display statue. The sculpt captures Megumi in a calm, battle-ready crouch with his hands posed for a technique, giving the piece a focused and intense presence that looks great from multiple angles. <br><br>Compared with a mint-condition display piece, this statue shows light cosmetic wear from previous handling/display. The figure still presents very well overall: the facial expression is clean, the dark uniform has strong sculpted folds, the hair spikes are intact, and the glossy black base gives it a polished collector look. Please note there are minor visible marks/scuffs on the outfit and base, including a small mark on the upper sleeve area and light surface wear on the base. No major breaks or missing pieces are visible in the photos. <br><br>This is an excellent pick for a Jujutsu Kaisen fan who wants a display-ready Megumi figure at a fair price without paying mint-condition pricing. A strong value piece with plenty of shelf impact.",
        images: [
            'images/action figure/Megumi_Fushiguro_front.jpg',
            'images/action figure/Megumi_Fushiguro_1.jpg',
            'images/action figure/Megumi_Fushiguro_2.jpg',
            'images/action figure/Megumi_Fushiguro_back.jpg'
        ],
        isPremium: false
    },
    {
        id: 'pikachu-plush-purse-bag',
        title: 'Pokemon Pikachu Plush Purse / Mini Bag',
        category: 'Accessories',
        price: 20.00,
        shortDesc: "Soft Pikachu plush-style mini bag with handle and inner Pikachu loop. Bright, cute, and ready for a Pokémon fan.",
        fullDesc: "Add a playful Pokémon touch to your outfit, collection, or gift lineup with this Pikachu plush-style purse / mini bag. The bright yellow fuzzy exterior, embroidered face, red cheeks, black-tipped ears, and soft handle give it that instantly recognizable Pikachu look while still being functional as a small carry bag. It also includes the Pikachu loop inside as noted, making it a fun little extra for fans. <br><br><strong>Condition:</strong> Good pre-owned/display condition based on the photo. Compared with a mint-condition bag, there may be light handling wear to the plush fibers from storage or display, but the front presents very well overall. The yellow color is bright, the embroidered facial details look intact, and no major stains, tears, or missing pieces are visible from the provided image. Please note that only one exterior photo is available, so interior/backside condition is not fully shown. <br><br>Market pricing for similar Pikachu plush purses and Pokémon tote/bag items varies widely depending on brand, size, and condition, with comparable listings commonly appearing around the low-$20s and some plush purse listings higher. At $20, this is priced as a fair, giftable Pokémon accessory with strong visual appeal.",
        images: [
            'images/accessories/pikachu_purse.jpg'
        ],
        isPremium: false
    },
    {
        id: 'disney-store-bambi-mini-bean-bag-plush',
        title: 'Vintage Disney Store Bambi Mini Bean Bag Plush w/ Tag',
        category: 'Plushie',
        price: 15.00,
        shortDesc: "Vintage Disney Store Bambi mini bean bag plush with tag attached. Sweet classic Disney collectible in display-ready condition.",
        fullDesc: "Add a classic Disney favorite to your plush collection with this vintage Disney Store Bambi Mini Bean Bag plush. Bambi is one of Disney's most recognizable characters, and this small bean bag plush captures the sweet fawn look with soft brown fabric, cream spots, black hooves, embroidered eyes, oversized ears, and the Disney Store tag still attached. It is a charming pickup for Disney collectors, Bambi fans, vintage plush collectors, or anyone building a nostalgic shelf display. <br><br><strong>Condition:</strong> Good vintage pre-owned/display condition with tag attached. Compared with a mint-condition plush, this Bambi shows normal age and handling from storage/display. The plush may have light lint/fiber pickup, mild fabric wear, and some natural creasing/softness in the seated pose. The tag is attached and visible, with normal bending/wrinkling from age and handling. The embroidered eyes, ears, spots, hooves, and stitching appear intact from the photos. No major tears, missing pieces, or heavy staining are visible in the provided images. <br><br>Market pricing for Disney Store Bambi mini bean bag plushes varies by size, tag condition, and exact release, with comparable Bambi/Disney bean bag plush listings often appearing around the low-to-mid teens and some lots or rarer examples going higher. This one is priced at $15 to stay competitive while still reflecting the attached tag and nostalgic Disney appeal.",
        images: [
            'images/plushie/bambi_main.jpg',
            'images/plushie/bambi_1.jpg',
            'images/plushie/bambi_2.jpg',
            'images/plushie/bambi_back.jpg'
        ],
        isPremium: false
    },
    {
        id: 'disney-store-scamp-mini-bean-bag-plush',
        title: "Disney Store Scamp Mini Bean Bag Plush - Lady and the Tramp II: Scamp's Adventure",
        category: 'Plushie',
        price: 20.00,
        shortDesc: "Disney Store Scamp mini bean bag plush with tag attached. A cute Lady and the Tramp II collectible for Disney dog fans.",
        fullDesc: "Add a sweet Disney dog collectible to your plush lineup with this Scamp Mini Bean Bag plush from The Disney Store. Scamp briefly appears at the end of the original 1955 Lady and the Tramp and later stars in Lady and the Tramp II: Scamp's Adventure, making him a fun character for Disney fans who like the deeper cuts beyond Mickey, Minnie, and the main princess lineup. This plush features Scamp's gray-and-cream coloring, pink inner ears, embroidered eyes, brown collar, seated pose, and Disney Store tag still attached. <br><br><strong>Condition:</strong> Good pre-owned/display condition with tag attached. Compared with a mint-condition plush, this Scamp shows light normal handling from storage/display. The plush fabric may have minor fiber wear or light lint, and the tag has some bending from being attached behind the plush. The embroidered eyes, nose, mouth stitching, ears, paws, collar, and Disney Store tag appear intact. No major tears, missing pieces, or heavy staining are visible from the provided photos. <br><br>Scamp plushes can vary significantly in value depending on exact release, size, and rarity. Some Disney Store and Lady and the Tramp II Scamp plush listings appear much higher, while smaller mini bean bag versions are generally more approachable. At $20, this is priced as a fair, collectible, and giftable Disney plush with nostalgic character appeal.",
        images: [
            'images/plushie/scramp_front.jpg',
            'images/plushie/scramp_1.jpg',
            'images/plushie/scramp_2.jpg'
        ],
        isPremium: false
    },
    {
        id: 'lion-king-ii-kovu-cub-bean-bag-plush',
        title: "Vintage Disney The Lion King II: Simba's Pride Kovu Cub Bean Bag Plush w/ Tag",
        category: 'Plushie',
        price: 20.00,
        shortDesc: "Vintage Kovu cub bean bag plush from The Lion King II: Simba's Pride with tag attached. A nostalgic Disney pickup at a fair price.",
        fullDesc: "Bring home a piece of late-90s Disney nostalgia with this Kovu cub bean bag plush from The Lion King II: Simba's Pride. Kovu is one of the standout characters from the 1998 sequel, and this small plush captures him as a cub with embroidered eyes, soft brown body, tan paws, a fuzzy mane, and the Simba's Pride tag still attached. It is a great display piece for Lion King fans, Disney plush collectors, or anyone who remembers the sequel era. <br><br><strong>Condition:</strong> Good vintage pre-owned/display condition with tag attached. Compared with a mint-condition plush, this piece shows normal age and handling wear. The plush fibers and fuzzy mane/tail look slightly tousled from storage/display, and the attached paper tag has visible bending/creasing/waviness. The embroidered eyes and facial details appear intact, and no major tears, missing pieces, or heavy stains are visible in the provided photos. Please note that only two angles are shown, so underside/backside condition is not fully documented. <br><br>Market value for tagged Kovu plushes varies depending on size, tag condition, and exact release, with comparable listings commonly appearing around the mid-teens to $25 range and some higher. At $20, this is priced as a fair, collectible, and giftable Disney plush with strong nostalgic appeal.",
        images: [
            'images/plushie/kovu_1.jpg',
            'images/plushie/kovu_2.jpg'
        ],
        isPremium: false
    },
    {
        id: 'disney-store-figaro-mini-bean-bag-plush',
        title: 'Vintage Disney Store Figaro Mini Bean Bag Plush - Pinocchio / Minnie Mouse Cat',
        category: 'Plushie',
        price: 20.00,
        shortDesc: "Vintage Disney Store Figaro mini bean bag plush with tag. Cute Pinocchio/Minnie collectible priced to move.",
        fullDesc: "Add a charming Disney classic to your collection with this vintage Disney Store Figaro Mini Bean Bag plush. Figaro first appeared as Geppetto's kitten in Disney's 1940 animated film Pinocchio and later became known as Minnie Mouse's pet cat, making this a fun crossover character for Disney collectors. This small black-and-white plush has bright embroidered yellow eyes, whiskers, a soft bean bag body, and the original Disney Store tag still attached. <br><br><strong>Condition:</strong> Good vintage pre-owned/display condition with tag. Compared with a mint-condition plush, this Figaro shows normal age/display handling. There is visible lint/fiber pickup on the black and white plush areas, and small dark marks are visible on at least one white paw in the photos. The eyes, facial stitching, ears, tail, and attached Disney Store tag appear intact. No major tears, missing limbs, or heavy staining are visible from the provided photos. <br><br>Vintage Disney Store mini bean bag plushes can vary in price depending on character, tag condition, and cleanliness. Similar Figaro/Disney Store bean bag plush listings commonly appear in the mid-teens to higher range depending on tag condition and character demand, so $20 is a fair collectible price while still staying approachable. A great little add-on item for Disney fans, Pinocchio collectors, Minnie Mouse collectors, or anyone who loves Figaro's classic mischievous-cat charm.",
        images: [
            'images/plushie/figaro_1.jpg',
            'images/plushie/figaro_2.jpg',
            'images/plushie/figaro_3.jpg'
        ],
        isPremium: false
    },
    {
        id: 'grogu-cuddleez-plush',
        title: 'Disney Cuddleez Grogu Plush - Large (23")',
        category: 'Plushie',
        price: 35.00,
        shortDesc: "Ultra-soft, oversized Grogu plush. Near-mint condition. The ultimate cuddle companion!",
        fullDesc: "Experience the absolute cuteness of the galaxy with this authentic Disney Cuddleez Grogu (Baby Yoda) plush. At a generous 23 inches, this plush is designed for maximum huggability and comfort. <br><br>Condition: Near-Mint. This plush has been kept in a clean, smoke-free environment. The soft-touch fabric is plush and pristine, with no signs of pilling, stains, or wear. The colors are vibrant, and the stitching is tight and secure. Whether you're a Star Wars super-fan or looking for the perfect gift for a loved one, this oversized Grogu is ready for a new home. A premium, cozy addition to any collection.",
        images: [
            'images/plushie/BabyYoda_Cuddleez_front.jpg',
            'images/plushie/BabyYoda_Cuddleez_1.jpg',
            'images/plushie/BabyYoda_Cuddleez_2.jpg',
            'images/plushie/BabyYoda_Cuddleez_3.jpg',
            'images/plushie/BabyYoda_Cuddleez_4.jpg',
            'images/plushie/BabyYoda_Cuddleez_5.jpg'
        ],
        isPremium: false
    },
    {
        id: 'coby-cx-cd109-personal-cd-player',
        title: 'Coby CX-CD109 Personal CD Player - Complete in Box',
        category: 'Vintage Electronics',
        price: 50.00,
        shortDesc: "New old stock Coby personal CD player in original packaging with headphones/manual. Great Y2K-era display or nostalgia piece.",
        fullDesc: "Bring back the portable CD era with this Coby CX-CD109 Personal CD Player, complete in its original retail packaging. This is a great nostalgia piece for anyone who remembers carrying CDs, headphones, and a portable player everywhere — and it has the right early-2000s look with the silver compact player, LCD display callout, included stereo headphones, and original Coby blister packaging. <br><br><strong>Condition:</strong> New old stock / complete in package, but not mint packaging. Compared with a pristine sealed example, the outer plastic blister shows visible age, shelf wear, scuffing, cloudiness/yellowing, small marks, and dust/debris around the edges. The cardboard insert also shows age discoloration and handling wear. The player, headphones, and manual appear to be present inside the original packaging, and the unit appears unused from the photos. <br><br><strong>Important note:</strong> Because this is vintage sealed/packaged electronics, it has not been opened or tested. The packaging states it requires 2 AA batteries, which are not included. This is best for a collector, nostalgic display, prop setup, or buyer comfortable with vintage electronics. A clean, complete-in-box throwback piece with strong shelf presence.",
        images: [
            'images/vintage electronics/cd-front.jpg',
            'images/vintage electronics/cd-back.jpg'
        ],
        isPremium: false
    },
    {
        id: 'nintendo-switch-oem-accessory-bundle',
        title: 'Nintendo Switch Console Bundle - Neon Blue/Red Joy-Con with OEM Dock & Accessories',
        category: 'Video Games',
        price: 200.00,
        shortDesc: "Parent-friendly Switch bundle with OEM dock, OEM charger, HDMI, and Joy-Con grip. Fully functional with cosmetic wear disclosed.",
        fullDesc: "Get a full Nintendo Switch setup in one bundle with the classic Neon Blue and Neon Red Joy-Con colorway. This package is ideal for someone who wants the core Switch experience without buying each accessory separately: handheld play, docked TV play, charging, HDMI output, and the OEM Joy-Con grip are all included. <br><br><strong>Why this is a smart family pickup:</strong> This is a great option for parents looking for a Switch their children can actually enjoy without the stress of buying a mint-condition console. The included OEM Nintendo dock, OEM charger, and OEM HDMI cable help avoid the common worry of mixing in questionable third-party charging accessories. At the same time, the visible cosmetic crack/wear means you are not paying collector-grade pricing for something a kid may put real hours on. It checks two boxes at once: reliable OEM accessories plus a practical, play-ready console you do not have to treat like a museum piece. <br><br><strong>Included:</strong><br>• Nintendo Switch console<br>• Neon Blue and Neon Red Joy-Con controllers<br>• OEM Nintendo Switch dock<br>• OEM Joy-Con grip<br>• OEM USB-C charging cable / OEM AC-to-USB-C charger<br>• OEM USB AC adapter<br>• OEM HDMI cable<br>• The Legend of Zelda: Breath of the Wild themed carrying case shown in the photos<br><br><strong>Condition:</strong> Fair to good pre-owned condition with visible cosmetic wear. Compared with a mint-condition Switch, this unit shows normal-to-moderate signs of previous use. The console is shown powered on and displaying the home screen/game screen. The screen has visible fingerprints, smudges, reflections, and possible light surface marks. The back of the console shows scuffs/scratches from handling. <br><br>The Joy-Con controllers present well from a distance, but the blue Joy-Con has a visible crack/line near the analog stick area along with small dark marks around the stick/buttons. This appears to be cosmetic plastic damage from the photos; the system is described as fully functional, and the crack does not take away from the everyday play value. The dock and Joy-Con grip show light scuffs and smudges typical of glossy black used accessories. The included Zelda carrying case is heavily worn cosmetically, with peeling/flaking on the exterior and lint/debris visible inside, so it should be viewed as a functional bonus rather than a collector-grade case. <br><br>Please note: no physical games are included unless shown separately. Any digital games or app icons visible on the home screen are not guaranteed to be included, since digital content is generally tied to a Nintendo account. This listing is for the hardware and accessories shown/described. <br><br>If you are looking for a mint collector piece, this is not the one. If you want a value-focused Switch bundle with OEM accessories, docked-play capability, and honest cosmetic flaws already factored into the price, this is a strong pickup.",
        images: [
            'images/video games/SwitchOEM_Main.jpg',
            'images/video games/SwitchOEM_1.jpg',
            'images/video games/SwitchOEM_2.jpg',
            'images/video games/SwitchOEM_3.jpg',
            'images/video games/SwitchOEM_4.jpg',
            'images/video games/SwitchOEM_5.jpg',
            'images/video games/SwitchOEM_6.jpg',
            'images/video games/SwitchOEM_7.jpg',
            'images/video games/SwitchOEM_8.jpg',
            'images/video games/SwitchOEM_9.jpg',
            'images/video games/SwitchOEM_10.jpg'
        ],
        isPremium: true
    },
    {
        id: 'nintendo-switch-neon-blue-red-bundle',
        title: 'Nintendo Switch Console Bundle - Neon Blue/Red Joy-Con, Dock & Cables',
        category: 'Video Games',
        price: 180.00,
        shortDesc: "Nintendo Switch bundle with neon Joy-Con, OEM dock, Joy-Con grip, HDMI, USB-C cable, and AC adapter. Powers on as shown.",
        fullDesc: "Jump into Nintendo's hybrid gaming experience with this Nintendo Switch console bundle featuring the classic Neon Blue and Neon Red Joy-Con setup. This is a strong starter bundle for anyone who wants the core Switch experience: handheld play, docked TV play, and the essential accessories needed to get going. <br><br><strong>Included:</strong><br>• Nintendo Switch console<br>• Neon Blue and Neon Red Joy-Con controllers<br>• OEM Nintendo Switch dock<br>• OEM Joy-Con grip<br>• USB-C charging cable<br>• USB AC adapter<br>• HDMI cable<br><br><strong>Condition:</strong> Good pre-owned condition. Compared with a mint-condition unit, this Switch bundle shows normal signs of previous use. The console is shown powered on and displaying the home menu. The screen/digitizer area has visible fingerprints, smudges, reflections, and possible light surface marks from handling. The dock and glossy Joy-Con grip show visible smudging and light scuffs typical of used black plastic accessories. The Joy-Con shells present well overall from the photos, with normal handling wear. Cables and adapter are included as pictured and show typical used cable wear. <br><br>Please note: no physical games are included unless shown separately in another listing. Any digital games/icons visible on the home screen are not guaranteed to be included, since digital purchases are generally tied to a Nintendo account. This listing is for the hardware and accessories shown/described. <br><br>If you're looking for a clean, functional-looking Switch setup without paying brand-new pricing, this is a compelling bundle: console, dock, Joy-Con, grip, HDMI, and charging accessories all together at a fair price.",
        images: [
            'images/video games/Switch1_main.jpg',
            'images/video games/Switch1_1.jpg',
            'images/video games/Switch1_2.jpg'
        ],
        isPremium: true
    },
    {
        id: 'game-boy-color-teal-pokemon-yellow-bundle',
        title: 'Original Nintendo Game Boy Color Teal + Pokemon Yellow Special Pikachu Edition',
        category: 'Video Games',
        price: 150.00,
        shortDesc: "Vintage teal Game Boy Color bundle with Pokemon Yellow. Working, collectible, and honestly priced with noted button wear.",
        fullDesc: "Own a true piece of handheld gaming history with this original teal Nintendo Game Boy Color bundled with Pokemon Yellow Special Pikachu Edition. This is the kind of nostalgic setup that instantly stands out: classic teal hardware, an iconic yellow Pokemon cartridge, and the simple pick-up-and-play magic that made the Game Boy era unforgettable. <br><br><strong>Condition:</strong> Good vintage condition for its age, with honest signs of use. Compared with a mint-condition console, the Game Boy Color shows visible cosmetic wear including scuffs, small marks on the shell, screen lens wear/smudging, and worn buttons. The battery cover is present. Pokemon Yellow is cartridge only and shows heavier label wear/fading, edge wear, and normal cartridge scuffs/marks, but the label remains recognizable and readable. No box, manuals, batteries, or additional accessories are included. <br><br><strong>Function note:</strong> The console is working and every button responds, but the buttons are worn down and some inputs may require a firmer press or occasional second press to activate. This is a common issue on older Game Boy Color systems; button responsiveness problems are often tied to dirty or worn conductive silicone pads/contacts, and retro repair sources commonly recommend cleaning the contacts/pads or replacing the silicone pads to improve response. This unit is being sold as a working vintage console with that button sensitivity clearly disclosed. <br><br>If you want a clean collector-grade museum piece, this is not mint. If you want a real, display-worthy, playable vintage Nintendo bundle with one of the most beloved Pokemon games ever, this is a strong pickup at a fair price.",
        images: [
            'images/video games/GBC_main.jpg',
            'images/video games/GBC_front.jpg',
            'images/video games/GBC_back.jpg',
            'images/video games/GBC_Pokemon1.jpg',
            'images/video games/GBC_Pokemon2.jpg'
        ],
        isPremium: true
    },
    {
        id: 'new-super-mario-bros-2-3ds',
        title: 'New Super Mario Bros. 2 - Nintendo 3DS Cartridge',
        category: 'Video Games',
        price: 15.00,
        shortDesc: "Fun, classic Mario platforming for Nintendo 3DS. Cartridge only with readable label and visible cosmetic wear.",
        fullDesc: "Add a must-have Nintendo 3DS platformer to your collection with New Super Mario Bros. 2. This is a great pickup for Mario fans, casual players, or anyone building a 3DS library on a budget. It delivers the familiar side-scrolling Mario action, colorful stages, and coin-collecting fun that makes it an easy game to revisit again and again. <br><br>Condition: Pre-owned cartridge in fair to good cosmetic condition. Compared with a mint-condition copy, this cartridge shows visible signs of normal use and handling. The label is intact and readable, but there is noticeable surface wear/marks, including light discoloration or scuffing near the lower label area. The gray cartridge shell also has small scuffs, dust/marks, and handling wear visible in the photo. No major cracks, chips, or broken plastic are visible. <br><br>Please note: this listing is for the cartridge only as pictured. No original case, cover art, manual, or inserts are included. A budget-friendly way to get a popular Mario title for Nintendo 3DS at a fair price.",
        images: [
            'images/video games/NewSuperMarioBros2.jpg'
        ],
        isPremium: false
    },
    {
        id: 'zelda-link-between-worlds-3ds',
        title: 'The Legend of Zelda: A Link Between Worlds - Nintendo 3DS Cartridge',
        category: 'Video Games',
        price: 25.00,
        shortDesc: "Classic Zelda adventure for Nintendo 3DS. Cartridge only with a clean, readable label and light cosmetic wear.",
        fullDesc: "Step back into one of the Nintendo 3DS library's most beloved adventures with The Legend of Zelda: A Link Between Worlds. This fast-paced Zelda entry is a fantastic pickup for collectors, longtime fans, or anyone building out a strong 3DS game library. It is easy to jump into, highly replayable, and a great way to own a modern handheld Zelda classic without paying collector-grade complete-in-box pricing. <br><br>Condition: Good pre-owned condition. Compared with a mint-condition copy, this cartridge shows light cosmetic wear from normal handling. The front label is intact and fully readable, with minor surface wear/edge wear visible in the photo. The gray cartridge shell also shows small marks/scuffs consistent with use, but no major cracks, chips, or broken plastic are visible. <br><br>Please note: this listing is for the cartridge only as pictured. No original case, cover art, manual, or inserts are included. A solid, displayable, and playable-looking copy for anyone who wants the game itself at a fair price.",
        images: [
            'images/video games/ZeldaLBW.jpg'
        ],
        isPremium: false
    },
    {
        id: 'ps2-fat-bundle',
        title: 'Sony PlayStation 2 (Fat) Ultimate Bundle - 27 Games',
        category: 'Video Games',
        price: 300.00,
        shortDesc: "The ultimate nostalgia trip. Complete PS2 Fat system with massive 27-game library, remote, and manuals.",
        fullDesc: "Relive the golden era of gaming with this comprehensive PlayStation 2 (Fat Version) Ultimate Bundle. This isn't just a console; it's a complete time capsule of the early 2000s. <br><br><strong>What's Included:</strong><br>• Sony PS2 Fat Console (Clean, well-maintained condition)<br>• Original DualShock 2 Controller<br>• Sony DVD Remote Control (Rare accessory for DVD playback)<br>• Official Instruction Manual & Documentation<br>• Power & AV Cables<br>• Memory Cards<br>• <strong>A Massive 27-Game Library</strong> including hits like GTA San Andreas, Gran Turismo 3, Guitar Hero II, and a powerhouse collection of Madden and MVP Baseball titles.<br><br><strong>Condition:</strong> Very Good. The console is in great aesthetic shape with only minimal signs of light use. All cables are intact, and the games are housed in their original cases. This is a turn-key system—plug it in and you have an instant library of some of the greatest games ever made. Perfect for collectors or anyone looking to introduce a new generation to the PS2 legacy.",
        images: [
            'images/video games/Playstation_Bundle_Main.jpg',
            'images/video games/Playstation_Bundle_1.jpg',
            'images/video games/Playstation_Bundle_2.jpg',
            'images/video games/Playstation_Bundle_3.jpg',
            'images/video games/Playstation_Bundle_4.jpg',
            'images/video games/Playstation_Bundle_5.jpg',
            'images/video games/Playstation_Bundle_6.jpg'
        ],
        isPremium: true
    },
    {
        id: 'law-battle-record',
        title: 'Trafalgar Law - Battle Record Collection',
        category: 'Action Figure',
        price: 40.00,
        shortDesc: "Incredibly dynamic action sculpt. Near-mint condition. A masterpiece of One Piece artistry.",
        fullDesc: "Add the 'Surgeon of Death' to your ranks with this stunning Banpresto Battle Record Collection figure of Trafalgar Law. This piece is all about movement; the flowing cape and wide-stanced power pose perfectly capture Law's commanding presence on the battlefield. <br><br>Condition: Near-Mint. The paintwork is flawless, with the yellow of the jacket and the deep blue of the cape popping against the clean background. The sculpt is precise, from the detail on his hat to the grip on his sword. No visible scratches, paint bleed, or defects. This is a high-impact piece that brings a level of intensity and scale to any One Piece display. A must-have for fans of the Heart Pirates.",
        images: [
            'images/action figure/law_front.jpg',
            'images/action figure/law_1.jpg',
            'images/action figure/law_back.jpg'
        ],
        isPremium: true
    },
    // Add more items here in the future
];
const defaultInventory = inventory.map(item => ({ ...item, images: [...item.images] }));
window.CF_DEFAULT_INVENTORY = defaultInventory;
window.CF_INVENTORY = inventory;

function refreshInventoryViews(options = {}) {
    const { preservePremiumPicks = false } = options;
    window.CF_INVENTORY = inventory;
    if (!preservePremiumPicks) selectedPremiumPicks = null;
    populateCategoryFilter();
    populateListingsCategoryFilter();
    renderPremiumInventory();
    renderInventory();
    renderListingsPage();
    renderCategoriesPage();
}

function setInventoryItems(items, options = {}) {
    inventory = Array.isArray(items) ? items : defaultInventory.map(item => ({ ...item, images: [...item.images] }));
    refreshInventoryViews(options);
}

window.CF_SET_INVENTORY = setInventoryItems;
window.CF_REFRESH_INVENTORY = refreshInventoryViews;

// --- VIEW NAVIGATION ---
function showView(viewId) {
    const homeView = document.getElementById('view-home');
    const productView = document.getElementById('view-product');
    const aboutView = document.getElementById('view-about');
    const listingsView = document.getElementById('view-listings');
    const categoriesView = document.getElementById('view-categories');
    const contactView = document.getElementById('view-contact');

    homeView?.classList.add('hidden-view');
    productView?.classList.add('hidden-view');
    aboutView?.classList.add('hidden-view');
    listingsView?.classList.add('hidden-view');
    categoriesView?.classList.add('hidden-view');
    contactView?.classList.add('hidden-view');

    if (viewId === 'product') {
        productView?.classList.remove('hidden-view');
    } else if (viewId === 'about') {
        aboutView?.classList.remove('hidden-view');
    } else if (viewId === 'listings') {
        listingsView?.classList.remove('hidden-view');
    } else if (viewId === 'categories') {
        categoriesView?.classList.remove('hidden-view');
    } else if (viewId === 'contact') {
        contactView?.classList.remove('hidden-view');
    } else {
        homeView?.classList.remove('hidden-view');
    }

    window.scrollTo(0, 0);
}

function scrollToSection(sectionId) {
    setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

function getRandomHeroMessage() {
    const messages = [
        {
            title: 'Need Inventory Gone? <span class="text-blue-400">Cypress, CA Buys.</span>',
            subtitle: 'Turn slow-moving collectibles, games, cards, electronics, toys, or gear into cash without listing, messaging, shipping, or waiting on flaky buyers.',
            primaryText: 'Sell Inventory',
            primarySection: 'suppliers',
            secondaryText: 'See What I Buy',
            secondarySection: 'inventory'
        },
        {
            title: 'Welcome to <span class="text-blue-400">Cypress, CA Flips.</span>',
            subtitle: 'A local resale shop for parents, collectors, gamers, riders, and gift hunters who want inspected goods, honest condition notes, and fair deals.',
            primaryText: 'Shop Local Finds',
            primarySection: 'inventory',
            secondaryText: 'Why Trust Me?',
            secondaryView: 'about'
        },
        {
            title: 'For Parents, Collectors & Deal Hunters. <span class="text-blue-400">No Guesswork.</span>',
            subtitle: 'Find kid-friendly consoles, nostalgic games, Disney plush, anime figures, and collectibles with flaws disclosed before you waste time or gas.',
            primaryText: 'Browse Inventory',
            primarySection: 'inventory',
            secondaryText: 'Ask a Question',
            secondaryView: 'contact'
        },
        {
            title: 'TCG Cards. Collectibles. <span class="text-blue-400">Video Games.</span>',
            subtitle: 'Cypress Flips focuses on handheld consoles, games, Pokémon cards, collectibles, plush, figures, motorcycle accessories, and occasional hard-to-source finds.',
            primaryText: 'Explore Categories',
            primarySection: 'inventory',
            secondaryText: 'Sell a Collection',
            secondarySection: 'suppliers'
        },
        {
            title: 'Quality Finds. <span class="text-blue-400">Cypress, CA Value.</span>',
            subtitle: 'Based in Cypress, CA and serving Orange County and the LA area with inspected resale goods, honest listings, and no-pressure local deals.',
            primaryText: 'Browse Inventory',
            primarySection: 'inventory',
            secondaryText: 'Become a Supplier',
            secondarySection: 'suppliers'
        }
    ];

    return messages[Math.floor(Math.random() * messages.length)];
}

function setupHeroMessage() {
    const message = getRandomHeroMessage();
    const title = document.getElementById('hero-title');
    const subtitle = document.getElementById('hero-subtitle');
    const primary = document.getElementById('hero-primary-cta');
    const secondary = document.getElementById('hero-secondary-cta');
    const stats = document.getElementById('hero-stats');

    if (title) title.innerHTML = message.title;
    if (subtitle) subtitle.textContent = message.subtitle;
    if (primary) {
        primary.textContent = message.primaryText;
        primary.href = `#${message.primarySection}`;
        primary.dataset.navSection = message.primarySection;
    }
    if (secondary) {
        secondary.textContent = message.secondaryText;
        if (message.secondaryView) {
            secondary.href = `#${message.secondaryView}`;
            secondary.dataset.navView = message.secondaryView;
            delete secondary.dataset.navSection;
        } else {
            secondary.href = `#${message.secondarySection}`;
            secondary.dataset.navSection = message.secondarySection;
            delete secondary.dataset.navView;
        }
    }

    if (stats) {
        const categories = new Set(inventory.map(item => item.category)).size;
        const premiumCount = inventory.filter(item => item.isPremium).length;
        stats.innerHTML = `
            <button type="button" class="hero-stat-card" data-stat-action="listings"><span>${inventory.length}</span><small>Current Listings</small></button>
            <button type="button" class="hero-stat-card" data-stat-action="premium"><span>${premiumCount}</span><small>Premium Picks</small></button>
            <button type="button" class="hero-stat-card" data-stat-action="categories"><span>${categories}</span><small>Categories</small></button>
        `;
        setupHeroStatListeners();
    }
}


function setupHeroStatListeners() {
    document.querySelectorAll('[data-stat-action]').forEach(button => {
        if (button.dataset.bound) return;
        button.dataset.bound = 'true';
        button.addEventListener('click', () => {
            const action = button.dataset.statAction;
            if (action === 'premium') {
                openListingsPage({ mode: 'premium' });
            } else if (action === 'categories') {
                openCategoriesPage();
            } else {
                openListingsPage({ mode: 'all' });
            }
        });
    });
}

let revealObserver = null;

function setupScrollReveal() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        document.querySelectorAll('.reveal').forEach(element => element.classList.add('reveal-visible'));
        return;
    }

    revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.14,
        rootMargin: '0px 0px -8% 0px'
    });

    observeRevealElements(document);
}

function observeRevealElements(root = document) {
    const revealElements = root.querySelectorAll ? root.querySelectorAll('.reveal:not(.reveal-observed)') : [];

    revealElements.forEach((element, index) => {
        element.classList.add('reveal-observed');
        if (!element.style.transitionDelay && element.classList.contains('product-card')) {
            element.style.transitionDelay = `${Math.min(index * 55, 220)}ms`;
        }

        if (revealObserver) {
            revealObserver.observe(element);
        } else {
            element.classList.add('reveal-visible');
        }
    });
}

window.observeRevealElements = observeRevealElements;

function setupHeaderEffects() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    const updateNav = () => {
        nav.classList.toggle('nav-scrolled', window.scrollY > 12);
    };

    updateNav();
    window.addEventListener('scroll', updateNav, { passive: true });
}

function setupBackToTop() {
    const button = document.getElementById('back-to-top');
    if (!button) return;

    const updateVisibility = () => {
        button.classList.toggle('hidden', window.scrollY < 650);
    };

    button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
}

function setupKeyboardShortcuts() {
    document.addEventListener('keydown', event => {
        const target = event.target;
        const isTyping = target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);

        if (event.key === '/' && !isTyping && !document.getElementById('view-home')?.classList.contains('hidden-view')) {
            event.preventDefault();
            scrollToSection('inventory');
            setTimeout(() => document.getElementById('inventory-search')?.focus(), 250);
        }

        if (event.key === 'Escape') {
            document.getElementById('auth-modal')?.classList.add('hidden');
            document.getElementById('profile-panel')?.classList.add('hidden');
            if (!document.getElementById('view-product')?.classList.contains('hidden-view')) showView('home');
        }
    });
}

function setupStaticNavigationListeners() {
    const brandHome = document.getElementById('brand-home');
    if (brandHome) {
        brandHome.addEventListener('click', () => showView('home'));
    }

    document.querySelectorAll('[data-nav-section]').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            showView('home');
            scrollToSection(link.dataset.navSection);
            if (typeof mobileMenu !== 'undefined') mobileMenu?.classList.add('hidden');
        });
    });

    document.querySelectorAll('[data-nav-view]').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            showView(link.dataset.navView);
            if (typeof mobileMenu !== 'undefined') mobileMenu?.classList.add('hidden');
        });
    });

    const aboutBackHome = document.getElementById('about-back-home');
    if (aboutBackHome) {
        aboutBackHome.addEventListener('click', () => showView('home'));
    }

    const listingsBackHome = document.getElementById('listings-back-home');
    if (listingsBackHome) {
        listingsBackHome.addEventListener('click', () => showView('home'));
    }

    const categoriesBackHome = document.getElementById('categories-back-home');
    if (categoriesBackHome) {
        categoriesBackHome.addEventListener('click', () => showView('home'));
    }

    const contactBackHome = document.getElementById('contact-back-home');
    if (contactBackHome) {
        contactBackHome.addEventListener('click', () => showView('home'));
    }

    const contactSellToUs = document.getElementById('contact-sell-to-us');
    if (contactSellToUs) {
        contactSellToUs.addEventListener('click', () => {
            showView('home');
            scrollToSection('suppliers');
        });
    }

    const backButton = document.getElementById('back-to-inventory');
    if (backButton) {
        backButton.addEventListener('click', () => showView('home'));
    }

    const productInquiryButton = document.getElementById('show-product-inquiry');
    if (productInquiryButton) {
        productInquiryButton.addEventListener('click', showProductInquiryForm);
    }
}

// --- INVENTORY RENDERING, SEARCH & SORTING ---
function stripHTML(value) {
    const temp = document.createElement('div');
    temp.innerHTML = value || '';
    return temp.textContent || temp.innerText || '';
}

function populateCategoryFilter() {
    const categoryFilter = document.getElementById('category-filter');
    if (!categoryFilter) return;

    const categories = [...new Set(inventory.map(item => item.category))].sort();
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

function createProductCard(item, tierLabel = '') {
    const card = document.createElement('div');
    const tierBadge = tierLabel ? `<span class="absolute top-3 right-3 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded">${tierLabel}</span>` : '';
    card.className = 'product-card reveal bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `View details for ${item.title}`);
    card.onclick = () => openProduct(item.id);
    card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openProduct(item.id);
        }
    });
    card.innerHTML = `
        <div class="aspect-square bg-gray-200 relative flex items-center justify-center overflow-hidden">
            <img src="${item.images[0]}" alt="${item.title}" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-110 transition duration-300" onerror="this.src='https://via.placeholder.com/400?text=Product'">
            ${item.isPremium ? '<span class="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">PREMIUM</span>' : ''}
            ${tierBadge}
        </div>
        <div class="p-5">
            <div class="text-xs font-bold text-blue-500 uppercase mb-1">${item.category}</div>
            <h3 class="font-bold text-lg mb-1">${item.title}</h3>
            <p class="text-gray-500 text-sm mb-4">${item.shortDesc}</p>
            <div class="flex justify-between items-center gap-3">
                <span class="text-xl font-bold text-blue-600">$${item.price.toFixed(2)}</span>
                <button type="button" class="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium group-hover:bg-slate-700 transition">View Details</button>
            </div>
        </div>
    `;
    return card;
}

let selectedPremiumPicks = null;
let currentProduct = null;
let showEntireInventory = false;

function pickRandom(items) {
    if (!items.length) return null;
    return items[Math.floor(Math.random() * items.length)];
}

function getClosestByPrice(items, targetPrice) {
    if (!items.length) return null;
    return [...items].sort((a, b) => Math.abs(a.price - targetPrice) - Math.abs(b.price - targetPrice))[0];
}

function getFeaturedPremiumPicks() {
    if (selectedPremiumPicks) return selectedPremiumPicks;

    const premiumItems = inventory
        .filter(item => item.isPremium)
        .map(item => ({ ...item }))
        .sort((a, b) => a.price - b.price);

    if (premiumItems.length <= 3) {
        const sorted = [...premiumItems].sort((a, b) => a.price - b.price);
        const labels = sorted.length === 1
            ? ['HIGHEST PICK']
            : sorted.length === 2
                ? ['LOW-PRICE PICK', 'HIGHEST PICK']
                : ['LOW-PRICE PICK', 'MID-TIER PICK', 'HIGHEST PICK'];

        selectedPremiumPicks = sorted.map((item, index) => ({ item, label: labels[index] || 'PREMIUM PICK' }));
        return selectedPremiumPicks;
    }

    const lowestPrice = premiumItems[0].price;
    const highestItem = premiumItems[premiumItems.length - 1];
    const highestPrice = highestItem.price;
    const priceSpread = highestPrice - lowestPrice;
    const usedIds = new Set([highestItem.id]);

    // Mid tier: aim for the midpoint between the lowest and highest premium prices.
    // Use a flexible window: at least $50 on either side, or 25% of the midpoint if that is larger.
    const midTarget = (lowestPrice + highestPrice) / 2;
    const midWindow = Math.max(50, midTarget * 0.25);
    const midMin = midTarget - midWindow;
    const midMax = midTarget + midWindow;
    const midCandidates = premiumItems.filter(item =>
        !usedIds.has(item.id) && item.price >= midMin && item.price <= midMax
    );
    const midItem = pickRandom(midCandidates) || getClosestByPrice(
        premiumItems.filter(item => !usedIds.has(item.id)),
        midTarget
    );
    if (midItem) usedIds.add(midItem.id);

    // Low tier: randomly pick from the low end, capped by the lowest 35% of the premium price spread
    // and by 2x the lowest premium price, while staying below the selected mid-tier item when possible.
    const lowUpperBySpread = lowestPrice + (priceSpread * 0.35);
    const lowUpperByLowest = lowestPrice * 2;
    const lowUpperByMid = midItem ? Math.max(lowestPrice, midItem.price - 0.01) : midTarget - 0.01;
    const lowMax = Math.min(lowUpperBySpread, lowUpperByLowest, lowUpperByMid);
    const lowCandidates = premiumItems.filter(item =>
        !usedIds.has(item.id) && item.price <= lowMax
    );
    const lowItem = pickRandom(lowCandidates) || premiumItems.find(item => !usedIds.has(item.id));
    if (lowItem) usedIds.add(lowItem.id);

    const picks = [];
    if (lowItem) picks.push({ item: lowItem, label: 'LOW-PRICE PICK' });
    if (midItem) picks.push({ item: midItem, label: 'MID-TIER PICK' });
    picks.push({ item: highestItem, label: 'HIGHEST PICK' });

    // Safety fill in case inventory size/duplicate pricing creates fewer than 3 unique picks.
    premiumItems.forEach(item => {
        if (picks.length < 3 && !picks.some(pick => pick.item.id === item.id)) {
            picks.push({ item, label: 'PREMIUM PICK' });
        }
    });

    selectedPremiumPicks = picks.slice(0, 3);
    return selectedPremiumPicks;
}

function renderPremiumInventory() {
    const premiumGrid = document.getElementById('premium-grid');
    if (!premiumGrid) return;

    const premiumPicks = getFeaturedPremiumPicks();
    premiumGrid.innerHTML = '';

    if (premiumPicks.length === 0) {
        premiumGrid.innerHTML = `
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center col-span-full">
                <p class="text-gray-500">Premium picks will be featured here soon.</p>
            </div>
        `;
        return;
    }

    premiumPicks.forEach(({ item, label }) => {
        const card = createProductCard(item, label);
        card.classList.add('premium-pick-card');

        if (label.includes('LOW')) card.classList.add('premium-pick-card--low');
        if (label.includes('MID')) card.classList.add('premium-pick-card--mid');
        if (label.includes('HIGHEST')) card.classList.add('premium-pick-card--high');

        premiumGrid.appendChild(card);
    });

    observeRevealElements(premiumGrid);
    centerMidPremiumPickOnMobile();
}

function centerMidPremiumPickOnMobile() {
    const premiumGrid = document.getElementById('premium-grid');
    const midPick = premiumGrid?.querySelector('.premium-pick-card--mid');
    if (!premiumGrid || !midPick || !window.matchMedia('(max-width: 639px)').matches) return;

    requestAnimationFrame(() => {
        const targetLeft = midPick.offsetLeft - ((premiumGrid.clientWidth - midPick.clientWidth) / 2);
        premiumGrid.scrollTo({ left: Math.max(targetLeft, 0), behavior: 'smooth' });
    });
}

function getFilterState() {
    return {
        query: (document.getElementById('inventory-search')?.value || '').trim().toLowerCase(),
        category: document.getElementById('category-filter')?.value || 'all',
        price: document.getElementById('price-filter')?.value || 'all',
        sort: document.getElementById('sort-filter')?.value || 'featured',
        showAll: showEntireInventory || document.getElementById('show-all-toggle')?.checked || false
    };
}

function matchesPriceRange(item, range) {
    if (range === 'all') return true;
    if (range === '200-plus') return item.price >= 200;

    const [min, max] = range.split('-').map(Number);
    if (Number.isNaN(min) || Number.isNaN(max)) return true;
    return item.price >= min && item.price <= max;
}

function hasFilteringCriteria(state) {
    return Boolean(state.query) || state.category !== 'all' || state.price !== 'all';
}

function shouldShowFullInventory(state) {
    return state.showAll || hasFilteringCriteria(state);
}

function getFilteredInventory() {
    const state = getFilterState();

    let items = inventory
        .map((item, index) => ({ ...item, originalIndex: index }))
        .filter(item => {
            const searchableText = [
                item.title,
                item.category,
                item.shortDesc,
                stripHTML(item.fullDesc),
                `$${item.price.toFixed(2)}`
            ].join(' ').toLowerCase();

            const matchesSearch = !state.query || searchableText.includes(state.query);
            const matchesCategory = state.category === 'all' || item.category === state.category;
            const matchesPrice = matchesPriceRange(item, state.price);

            return matchesSearch && matchesCategory && matchesPrice;
        });

    switch (state.sort) {
        case 'price-asc':
            items.sort((a, b) => a.price - b.price || a.title.localeCompare(b.title));
            break;
        case 'price-desc':
            items.sort((a, b) => b.price - a.price || a.title.localeCompare(b.title));
            break;
        case 'title-asc':
            items.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'title-desc':
            items.sort((a, b) => b.title.localeCompare(a.title));
            break;
        case 'category-asc':
            items.sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title));
            break;
        case 'premium-first':
        case 'featured':
        default:
            items.sort((a, b) => Number(b.isPremium) - Number(a.isPremium) || a.originalIndex - b.originalIndex);
            break;
    }

    return { items, state };
}


let listingsMode = 'all';
let selectedCategoryPageCategory = null;
let listingsPage = 1;
let categoryPage = 1;

function sortInventoryItems(items, sort = 'featured') {
    const sorted = [...items];
    switch (sort) {
        case 'price-asc':
            sorted.sort((a, b) => a.price - b.price || a.title.localeCompare(b.title));
            break;
        case 'price-desc':
            sorted.sort((a, b) => b.price - a.price || a.title.localeCompare(b.title));
            break;
        case 'title-asc':
            sorted.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'title-desc':
            sorted.sort((a, b) => b.title.localeCompare(a.title));
            break;
        case 'category-asc':
            sorted.sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title));
            break;
        case 'premium-first':
        case 'featured':
        default:
            sorted.sort((a, b) => Number(b.isPremium) - Number(a.isPremium) || (a.originalIndex ?? 0) - (b.originalIndex ?? 0));
            break;
    }
    return sorted;
}

function itemMatchesQuery(item, query) {
    if (!query) return true;
    const searchableText = [
        item.title,
        item.category,
        item.shortDesc,
        stripHTML(item.fullDesc),
        `$${item.price.toFixed(2)}`
    ].join(' ').toLowerCase();
    return searchableText.includes(query.toLowerCase());
}

function populateListingsCategoryFilter() {
    const categoryFilter = document.getElementById('listings-category-filter');
    if (!categoryFilter) return;

    const currentValue = categoryFilter.value || 'all';
    const categories = [...new Set(inventory.map(item => item.category))].sort();
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
    categoryFilter.value = categories.includes(currentValue) ? currentValue : 'all';
}

function getListingsFilterState() {
    return {
        query: (document.getElementById('listings-search')?.value || '').trim().toLowerCase(),
        category: document.getElementById('listings-category-filter')?.value || 'all',
        price: document.getElementById('listings-price-filter')?.value || 'all',
        sort: document.getElementById('listings-sort-filter')?.value || 'featured'
    };
}

function getListingsItems() {
    const state = getListingsFilterState();
    let items = inventory
        .map((item, index) => ({ ...item, originalIndex: index }))
        .filter(item => listingsMode !== 'premium' || item.isPremium)
        .filter(item => itemMatchesQuery(item, state.query))
        .filter(item => state.category === 'all' || item.category === state.category)
        .filter(item => matchesPriceRange(item, state.price));

    return { items: sortInventoryItems(items, state.sort), state };
}

function openListingsPage(options = {}) {
    listingsMode = options.mode || 'all';
    listingsPage = 1;
    populateListingsCategoryFilter();

    const categoryFilter = document.getElementById('listings-category-filter');
    const search = document.getElementById('listings-search');
    const price = document.getElementById('listings-price-filter');
    const sort = document.getElementById('listings-sort-filter');

    if (search) search.value = '';
    if (price) price.value = 'all';
    if (sort) sort.value = listingsMode === 'premium' ? 'price-desc' : 'featured';
    if (categoryFilter) categoryFilter.value = options.category || 'all';

    showView('listings');
    renderListingsPage();
}

function clearListingsFilters() {
    const search = document.getElementById('listings-search');
    const category = document.getElementById('listings-category-filter');
    const price = document.getElementById('listings-price-filter');
    const sort = document.getElementById('listings-sort-filter');

    if (search) search.value = '';
    if (category) category.value = 'all';
    if (price) price.value = 'all';
    if (sort) sort.value = listingsMode === 'premium' ? 'price-desc' : 'featured';
    listingsPage = 1;
    renderListingsPage();
}

function applyGridPreference(grid, preference = 'comfortable') {
    if (!grid) return;
    grid.classList.remove('product-grid--compact', 'product-grid--spacious', 'product-grid--comfortable');
    grid.classList.add(`product-grid--${preference || 'comfortable'}`);
}

function getGridColumnCount(grid) {
    if (!grid) return window.innerWidth >= 1280 ? 4 : window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
    const templateColumns = window.getComputedStyle(grid).gridTemplateColumns;
    const columns = templateColumns.split(' ').filter(Boolean).length;
    return columns || 1;
}

function getAutoPageSize(grid) {
    const columns = getGridColumnCount(grid);
    if (columns <= 1) return 10;
    if (columns === 2) return 14;
    if (columns === 3) return 15;
    if (columns === 4) return 16;
    return columns * 4;
}

function getSelectedPageSize(selectId, grid) {
    const value = document.getElementById(selectId)?.value || 'auto';
    if (value === 'auto') return getAutoPageSize(grid);
    return Number(value) || getAutoPageSize(grid);
}

function renderPagination(containerId, totalItems, pageSize, currentPage, onPageChange) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }

    const pageButtons = [];
    const addPageButton = page => {
        pageButtons.push(`<button type="button" class="pagination-page ${page === currentPage ? 'active' : ''}" data-page="${page}">${page}</button>`);
    };

    if (totalPages <= 7) {
        for (let page = 1; page <= totalPages; page += 1) addPageButton(page);
    } else {
        addPageButton(1);
        if (currentPage > 4) pageButtons.push('<span class="pagination-ellipsis">…</span>');
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);
        for (let page = start; page <= end; page += 1) addPageButton(page);
        if (currentPage < totalPages - 3) pageButtons.push('<span class="pagination-ellipsis">…</span>');
        addPageButton(totalPages);
    }

    container.innerHTML = `
        <button type="button" class="pagination-nav" data-page="${Math.max(1, currentPage - 1)}" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
        <div class="pagination-pages">${pageButtons.join('')}</div>
        <button type="button" class="pagination-nav" data-page="${Math.min(totalPages, currentPage + 1)}" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
    `;

    container.querySelectorAll('[data-page]').forEach(button => {
        button.addEventListener('click', () => onPageChange(Number(button.dataset.page)));
    });
}

function getPageItems(items, page, pageSize) {
    const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
    const safePage = Math.min(Math.max(1, page), totalPages);
    const start = (safePage - 1) * pageSize;
    return {
        pageItems: items.slice(start, start + pageSize),
        safePage,
        totalPages,
        start,
        end: Math.min(start + pageSize, items.length)
    };
}

function renderListingsPage() {
    const grid = document.getElementById('listings-grid');
    if (!grid) return;

    const title = document.getElementById('listings-title');
    const subtitle = document.getElementById('listings-subtitle');
    const kicker = document.getElementById('listings-kicker');
    const results = document.getElementById('listings-results');
    const gridSize = document.getElementById('listings-grid-size')?.value || 'comfortable';
    applyGridPreference(grid, gridSize);

    const { items, state } = getListingsItems();
    const pageSize = getSelectedPageSize('listings-page-size', grid);
    const pageData = getPageItems(items, listingsPage, pageSize);
    listingsPage = pageData.safePage;

    if (listingsMode === 'premium') {
        if (kicker) kicker.textContent = 'Premium Cypress, CA Offers';
        if (title) title.textContent = 'Premium Picks';
        if (subtitle) subtitle.textContent = 'All premium listings in one place, with sorting and filters so you can compare the best current offers.';
    } else {
        if (kicker) kicker.textContent = 'Cypress, CA Inventory';
        if (title) title.textContent = state.category !== 'all' ? `${state.category} Listings` : 'Current Listings';
        if (subtitle) subtitle.textContent = 'Browse every inspected item currently available from Cypress Flips.';
    }

    grid.innerHTML = '';
    if (results) {
        const productWord = items.length === 1 ? 'product' : 'products';
        results.textContent = items.length
            ? `Showing ${pageData.start + 1}-${pageData.end} of ${items.length} ${productWord}`
            : `Showing 0 ${productWord}`;
    }

    if (!items.length) {
        document.getElementById('listings-pagination').innerHTML = '';
        grid.innerHTML = `
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center col-span-full">
                <i class="fa-solid fa-magnifying-glass text-gray-400 text-4xl mb-4"></i>
                <h3 class="text-xl font-bold text-slate-900 mb-2">No listings found</h3>
                <p class="text-gray-500 mb-4">Try clearing filters or checking another category.</p>
                <button onclick="clearListingsFilters()" class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition">Clear Filters</button>
            </div>
        `;
        return;
    }

    pageData.pageItems.forEach(item => grid.appendChild(createProductCard(item)));
    renderPagination('listings-pagination', items.length, pageSize, listingsPage, page => {
        listingsPage = page;
        renderListingsPage();
        document.getElementById('listings-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    observeRevealElements(grid);
}

function getCategoryStats() {
    return [...new Set(inventory.map(item => item.category))]
        .sort()
        .map(category => {
            const items = inventory.filter(item => item.category === category);
            return {
                category,
                count: items.length,
                premiumCount: items.filter(item => item.isPremium).length,
                minPrice: Math.min(...items.map(item => item.price)),
                image: items[0]?.images?.[0] || ''
            };
        });
}

function openCategoriesPage() {
    selectedCategoryPageCategory = null;
    showView('categories');
    renderCategoriesPage();
}

function showCategoryProducts(category) {
    selectedCategoryPageCategory = category;
    categoryPage = 1;
    document.getElementById('category-products-section')?.classList.remove('hidden');
    renderCategoryProducts();
    document.getElementById('category-products-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderCategoriesPage() {
    const grid = document.getElementById('categories-grid');
    if (!grid) return;

    grid.innerHTML = '';
    getCategoryStats().forEach(stat => {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'category-card reveal bg-white border border-gray-200 rounded-2xl p-5 text-left shadow-sm transition';
        card.innerHTML = `
            <div class="aspect-[4/3] rounded-xl bg-gray-100 overflow-hidden mb-4">
                <img src="${stat.image}" alt="${stat.category}" loading="lazy" decoding="async" class="w-full h-full object-cover">
            </div>
            <div class="text-blue-600 font-bold uppercase text-xs tracking-wider mb-1">${stat.count} ${stat.count === 1 ? 'item' : 'items'}</div>
            <h3 class="text-xl font-bold text-slate-900 mb-2">${stat.category}</h3>
            <p class="text-gray-500 text-sm">Starting around $${stat.minPrice.toFixed(2)}${stat.premiumCount ? ` • ${stat.premiumCount} premium` : ''}</p>
        `;
        card.addEventListener('click', () => showCategoryProducts(stat.category));
        grid.appendChild(card);
    });
    observeRevealElements(grid);

    if (!selectedCategoryPageCategory) {
        document.getElementById('category-products-section')?.classList.add('hidden');
    } else {
        renderCategoryProducts();
    }
}

function renderCategoryProducts() {
    const grid = document.getElementById('category-products-grid');
    if (!grid || !selectedCategoryPageCategory) return;

    const sort = document.getElementById('category-products-sort')?.value || 'featured';
    const gridSize = document.getElementById('category-grid-size')?.value || 'comfortable';
    applyGridPreference(grid, gridSize);

    const items = sortInventoryItems(
        inventory
            .map((item, index) => ({ ...item, originalIndex: index }))
            .filter(item => item.category === selectedCategoryPageCategory),
        sort
    );

    const pageSize = getSelectedPageSize('category-page-size', grid);
    const pageData = getPageItems(items, categoryPage, pageSize);
    categoryPage = pageData.safePage;

    const title = document.getElementById('category-products-title');
    const count = document.getElementById('category-products-count');
    if (title) title.textContent = selectedCategoryPageCategory;
    if (count) {
        count.textContent = items.length
            ? `Showing ${pageData.start + 1}-${pageData.end} of ${items.length} ${items.length === 1 ? 'product' : 'products'}`
            : 'No products available';
    }

    grid.innerHTML = '';
    pageData.pageItems.forEach(item => grid.appendChild(createProductCard(item)));
    renderPagination('category-products-pagination', items.length, pageSize, categoryPage, page => {
        categoryPage = page;
        renderCategoryProducts();
        document.getElementById('category-products-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    observeRevealElements(grid);
}

function renderInventory() {
    const grid = document.getElementById('inventory-grid');
    const resultsLabel = document.getElementById('inventory-results');
    if (!grid) return;

    const { items, state } = getFilteredInventory();
    const premiumIdsAlreadyDisplayed = new Set(
        getFeaturedPremiumPicks().map(pick => pick.item.id)
    );
    const additionalItems = items.filter(item => !premiumIdsAlreadyDisplayed.has(item.id));
    const premiumCount = premiumIdsAlreadyDisplayed.size;
    grid.innerHTML = '';

    if (!shouldShowFullInventory(state)) {
        if (resultsLabel) {
            resultsLabel.textContent = 'Premium picks are displayed above. Turn on full inventory to browse everything else.';
        }

        const prompt = document.createElement('div');
        prompt.className = 'bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center col-span-full';
        prompt.innerHTML = `
            <h3 class="text-xl font-bold text-slate-900 mb-2">Full inventory is hidden</h3>
            <p class="text-gray-500 mb-4">Premium picks are shown first. Use search/filters above or turn on “Display entire inventory” to view the remaining listings without duplicates.</p>
            <button onclick="toggleEntireInventory(true)" class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition">Display Entire Inventory</button>
        `;
        grid.appendChild(prompt);
        return;
    }

    if (items.length === 0) {
        if (resultsLabel) resultsLabel.textContent = 'No matching products found';

        const emptyState = document.createElement('div');
        emptyState.className = 'bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center col-span-full';
        emptyState.innerHTML = `
            <i class="fa-solid fa-magnifying-glass text-gray-400 text-4xl mb-4"></i>
            <h3 class="text-xl font-bold text-slate-900 mb-2">No products found</h3>
            <p class="text-gray-500 mb-4">Try a different search term, category, price range, or sort option.</p>
            <button onclick="clearInventoryFilters()" class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition">Clear Filters</button>
        `;
        grid.appendChild(emptyState);
        return;
    }

    if (resultsLabel) {
        const additionalWord = additionalItems.length === 1 ? 'additional product' : 'additional products';
        if (hasFilteringCriteria(state)) {
            resultsLabel.textContent = `Showing ${additionalItems.length} matching ${additionalWord} below. Premium matches are already shown above.`;
        } else {
            resultsLabel.textContent = `Showing ${additionalItems.length} additional products below. ${premiumCount} premium picks are already shown above.`;
        }
    }

    if (additionalItems.length === 0) {
        const alreadyShownState = document.createElement('div');
        alreadyShownState.className = 'bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center col-span-full';
        alreadyShownState.innerHTML = `
            <i class="fa-solid fa-check-circle text-blue-500 text-4xl mb-4"></i>
            <h3 class="text-xl font-bold text-slate-900 mb-2">No duplicate listings</h3>
            <p class="text-gray-500 mb-4">Everything matching this view is already displayed in the Premium Picks section above.</p>
            <button onclick="clearInventoryFilters()" class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition">Clear Filters</button>
        `;
        grid.appendChild(alreadyShownState);
        return;
    }

    additionalItems.forEach(item => grid.appendChild(createProductCard(item)));
    observeRevealElements(grid);

}

function toggleEntireInventory(forceValue) {
    const toggle = document.getElementById('show-all-toggle');
    showEntireInventory = typeof forceValue === 'boolean' ? forceValue : !showEntireInventory;
    if (toggle) toggle.checked = showEntireInventory;
    renderInventory();
}

function clearInventoryFilters() {
    const search = document.getElementById('inventory-search');
    const category = document.getElementById('category-filter');
    const price = document.getElementById('price-filter');
    const sort = document.getElementById('sort-filter');
    const toggle = document.getElementById('show-all-toggle');

    if (search) search.value = '';
    if (category) category.value = 'all';
    if (price) price.value = 'all';
    if (sort) sort.value = 'featured';
    showEntireInventory = false;
    if (toggle) toggle.checked = false;

    renderInventory();
}

function setupInventoryControls() {
    populateCategoryFilter();
    populateListingsCategoryFilter();

    ['inventory-search', 'category-filter', 'price-filter', 'sort-filter', 'show-all-toggle'].forEach(id => {
        const element = document.getElementById(id);
        if (element) element.addEventListener('input', renderInventory);
        if (element) element.addEventListener('change', renderInventory);
    });

    ['listings-search', 'listings-category-filter', 'listings-price-filter', 'listings-sort-filter', 'listings-grid-size', 'listings-page-size'].forEach(id => {
        const element = document.getElementById(id);
        const handler = () => {
            listingsPage = 1;
            renderListingsPage();
        };
        if (element) element.addEventListener('input', handler);
        if (element) element.addEventListener('change', handler);
    });

    const clearButton = document.getElementById('clear-filters');
    if (clearButton) clearButton.addEventListener('click', clearInventoryFilters);

    const listingsClearButton = document.getElementById('listings-clear-filters');
    if (listingsClearButton) listingsClearButton.addEventListener('click', clearListingsFilters);

    ['category-products-sort', 'category-grid-size', 'category-page-size'].forEach(id => {
        const element = document.getElementById(id);
        if (element) element.addEventListener('change', () => {
            categoryPage = 1;
            renderCategoryProducts();
        });
    });

    const categoryClear = document.getElementById('category-products-clear');
    if (categoryClear) categoryClear.addEventListener('click', () => {
        selectedCategoryPageCategory = null;
        categoryPage = 1;
        document.getElementById('category-products-section')?.classList.add('hidden');
        document.getElementById('categories-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

// --- PRODUCT DETAIL LOGIC ---
function setProductInquiryDetails(item, options = {}) {
    const { resetForm = true, hidePanel = true } = options;
    const subject = document.getElementById('product-inquiry-subject');
    const titleField = document.getElementById('inquiry-product-title');
    const idField = document.getElementById('inquiry-product-id');
    const categoryField = document.getElementById('inquiry-product-category');
    const priceField = document.getElementById('inquiry-product-price');
    const panel = document.getElementById('product-inquiry-panel');
    const form = document.getElementById('product-inquiry-form');
    const status = document.getElementById('product-inquiry-status');

    if (resetForm && form) form.reset();
    if (hidePanel && panel) panel.classList.add('hidden');
    if (hidePanel && status) status.classList.add('hidden');

    if (subject) subject.value = `Product Inquiry: ${item.title} - $${item.price.toFixed(2)}`;
    if (titleField) titleField.value = item.title;
    if (idField) idField.value = item.id;
    if (categoryField) categoryField.value = item.category;
    if (priceField) priceField.value = `$${item.price.toFixed(2)}`;
}

function showProductInquiryForm() {
    const panel = document.getElementById('product-inquiry-panel');
    const message = document.getElementById('inquiry-message');
    if (!panel) return;

    panel.classList.remove('hidden');
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    setTimeout(() => message?.focus(), 250);
}

function openProduct(id) {
    const item = inventory.find(i => i.id === id);
    if (!item) return;
    currentProduct = item;
    window.CF_CURRENT_PRODUCT = item;

    document.getElementById('product-title').innerText = item.title;
    document.getElementById('product-category').innerText = item.category;
    document.getElementById('product-price').innerText = `$${item.price.toFixed(2)}`;
    document.getElementById('product-description').innerHTML = item.fullDesc;
    setProductInquiryDetails(item);
    
    const mainImg = document.getElementById('main-product-image');
    const imageCounter = document.getElementById('product-image-counter');
    mainImg.src = item.images[0];
    mainImg.alt = item.title;
    if (imageCounter) imageCounter.textContent = `Image 1 of ${item.images.length}`;

    const thumbGrid = document.getElementById('thumbnail-grid');
    thumbGrid.innerHTML = '';
    item.images.forEach((imgSrc, index) => {
        const thumb = document.createElement('div');
        thumb.className = `aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 transition ${index === 0 ? 'border-blue-600' : 'border-transparent hover:border-gray-300'}`;
        thumb.innerHTML = `<img src="${imgSrc}" alt="${item.title} image ${index + 1}" loading="lazy" decoding="async" class="w-full h-full object-cover">`;
        thumb.onclick = () => {
            mainImg.src = imgSrc;
            mainImg.alt = `${item.title} image ${index + 1}`;
            if (imageCounter) imageCounter.textContent = `Image ${index + 1} of ${item.images.length}`;
            // Update active thumbnail border
            Array.from(thumbGrid.children).forEach(child => child.classList.replace('border-blue-600', 'border-transparent'));
            thumb.classList.replace('border-transparent', 'border-blue-600');
        };
        thumbGrid.appendChild(thumb);
    });

    showView('product');
    window.dispatchEvent(new CustomEvent('cf:product-open', { detail: item }));
}

window.openProduct = openProduct;

// Theme Toggle: follows device preference unless the visitor chooses a theme
const THEME_STORAGE_KEY = 'cypress-flips-theme';
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-toggle-icon');
const themeText = document.getElementById('theme-toggle-text');
const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

function getPreferredTheme() {
    return localStorage.getItem(THEME_STORAGE_KEY) || (systemThemeQuery.matches ? 'dark' : 'light');
}

function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-mode', isDark);
    if (themeIcon) themeIcon.className = `fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}`;
    if (themeText) themeText.textContent = isDark ? 'Light' : 'Dark';
    if (themeToggle) themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
}

function setupThemeToggle() {
    applyTheme(getPreferredTheme());
    document.body.classList.add('theme-transition');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
            localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
            applyTheme(nextTheme);
        });
    }

    const handleSystemThemeChange = () => {
        if (!localStorage.getItem(THEME_STORAGE_KEY)) {
            applyTheme(systemThemeQuery.matches ? 'dark' : 'light');
        }
    };

    if (systemThemeQuery.addEventListener) {
        systemThemeQuery.addEventListener('change', handleSystemThemeChange);
    } else if (systemThemeQuery.addListener) {
        systemThemeQuery.addListener(handleSystemThemeChange);
    }
}

// Mobile Menu Toggle
const menuBtn = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Contact forms: static-site email handling through FormSubmit
const form = document.getElementById('supplier-form');
const nextUrl = document.getElementById('form-next-url');
if (form && nextUrl) {
    form.addEventListener('submit', () => {
        nextUrl.value = `${window.location.origin}${window.location.pathname}#contact`;
    });
}

const productInquiryForm = document.getElementById('product-inquiry-form');
const productInquiryNextUrl = document.getElementById('product-inquiry-next-url');
const productInquiryStatus = document.getElementById('product-inquiry-status');

function restoreProductInquiryHiddenFields() {
    if (currentProduct) setProductInquiryDetails(currentProduct, { resetForm: false, hidePanel: false });
}

function showProductInquiryStatus(type, messageHTML) {
    if (!productInquiryStatus) return;

    const styles = {
        sending: 'bg-blue-50 text-blue-700 border border-blue-200',
        success: 'bg-green-50 text-green-700 border border-green-200',
        error: 'bg-orange-50 text-orange-800 border border-orange-200'
    };

    productInquiryStatus.className = `mt-4 rounded-xl p-4 text-sm font-medium ${styles[type] || styles.sending}`;
    productInquiryStatus.innerHTML = messageHTML;
    productInquiryStatus.classList.remove('hidden');
}

function buildErrorReportLink(errorMessage = 'Unknown product inquiry form error') {
    const productTitle = currentProduct?.title || document.getElementById('inquiry-product-title')?.value || 'Unknown product';
    const productPrice = currentProduct ? `$${currentProduct.price.toFixed(2)}` : document.getElementById('inquiry-product-price')?.value || 'Unknown price';
    const productId = currentProduct?.id || document.getElementById('inquiry-product-id')?.value || 'Unknown ID';
    const customerEmail = document.getElementById('inquiry-email')?.value || '';

    const subject = encodeURIComponent(`Cypress Flips inquiry form error - ${productTitle}`);
    const body = encodeURIComponent(
        `Hi, I tried to send a product inquiry but the website form failed.

` +
        `Product: ${productTitle}
` +
        `Product ID: ${productId}
` +
        `Price: ${productPrice}
` +
        `Customer email: ${customerEmail}
` +
        `Error: ${errorMessage}

` +
        `My question/message:
`
    );

    return `mailto:mjmorrisonusa@gmail.com?subject=${subject}&body=${body}`;
}

if (productInquiryForm && productInquiryNextUrl) {
    productInquiryForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const submitButton = productInquiryForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton?.textContent || 'Send Product Inquiry';
        productInquiryNextUrl.value = `${window.location.origin}${window.location.pathname}#inventory`;

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            submitButton.classList.add('opacity-75', 'cursor-wait');
        }

        showProductInquiryStatus('sending', '<i class="fa-solid fa-paper-plane mr-2"></i>Sending your message...');

        try {
            const response = await fetch(productInquiryForm.action, {
                method: 'POST',
                body: new FormData(productInquiryForm),
                headers: { 'Accept': 'application/json' }
            });

            let result = {};
            try { result = await response.json(); } catch (_) { result = {}; }

            if (!response.ok || result.success === false || result.success === 'false') {
                throw new Error(result.message || `Form service returned status ${response.status}`);
            }

            showProductInquiryStatus(
                'success',
                '<i class="fa-solid fa-circle-check mr-2"></i>Message received — thank you! I’ll review your product inquiry and reply as soon as possible.'
            );
            productInquiryForm.reset();
            restoreProductInquiryHiddenFields();
        } catch (error) {
            const errorMessage = error?.message || 'Unable to send message.';
            const reportLink = buildErrorReportLink(errorMessage);
            showProductInquiryStatus(
                'error',
                `<i class="fa-solid fa-triangle-exclamation mr-2"></i>Your message could not be sent. Please try again, or <a class="underline font-bold" href="${reportLink}">send an error report by email</a>.`
            );
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText.trim() || 'Send Product Inquiry';
                submitButton.classList.remove('opacity-75', 'cursor-wait');
            }
        }
    });
}


function getCaliforniaHourKey(date = new Date()) {
    return new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Los_Angeles',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        hourCycle: 'h23'
    }).format(date);
}

function hashStringToIndex(value, length) {
    let hash = 0;
    for (let i = 0; i < value.length; i += 1) {
        hash = ((hash << 5) - hash) + value.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash) % length;
}

function setupHourlyScripture() {
    const scripture = document.getElementById('hourly-scripture');
    if (!scripture) return;

    // Short Scripture-based reflections with references. Colossians 3:23 is weighted most heavily.
    const verses = [
        { ref: 'Colossians 3:23', text: 'Work with your whole heart, as service offered to the Lord.' },
        { ref: 'Colossians 3:23', text: 'Whatever the task, give it honest effort before God.' },
        { ref: 'Colossians 3:23', text: 'Do the work in front of you with diligence and integrity.' },
        { ref: 'Colossians 3:23', text: 'Let every task be done wholeheartedly, not half-heartedly.' },
        { ref: 'Proverbs 3:5-6', text: 'Trust the Lord, walk straight, and do not lean only on yourself.' },
        { ref: 'Micah 6:8', text: 'Act justly, love mercy, and walk humbly with God.' },
        { ref: 'Matthew 5:16', text: 'Let good work shine in a way that points beyond yourself.' },
        { ref: 'Luke 6:31', text: 'Treat others the way you would want to be treated.' },
        { ref: '1 Corinthians 16:14', text: 'Let everything be done with love.' },
        { ref: 'Galatians 6:9', text: 'Do not grow tired of doing good.' },
        { ref: 'James 1:5', text: 'Ask God for wisdom when the right path is unclear.' },
        { ref: 'John 14:27', text: 'Peace is a gift; do not let your heart be troubled.' },
        { ref: 'Romans 12:2', text: 'Be renewed in mind, not shaped by every passing trend.' },
        { ref: 'Psalm 37:5', text: 'Commit your way to the Lord and keep moving faithfully.' },
        { ref: 'Joshua 1:9', text: 'Be strong and courageous; the Lord is with you.' },
        { ref: 'Philippians 4:13', text: 'Strength is found through Christ who sustains us.' }
    ];

    const updateVerse = () => {
        const key = getCaliforniaHourKey();
        const index = hashStringToIndex(`cypress-flips-${key}`, verses.length);
        const verse = verses[index];
        scripture.textContent = `${verse.ref} — ${verse.text}`;
    };

    updateVerse();
    setInterval(updateVerse, 60 * 1000);
}

let paginationResizeTimer = null;
window.addEventListener('resize', () => {
    clearTimeout(paginationResizeTimer);
    paginationResizeTimer = setTimeout(() => {
        renderListingsPage();
        renderCategoryProducts();
    }, 180);
});

function showGeneralContactStatus(type, messageHTML) {
    const status = document.getElementById('general-contact-status');
    if (!status) return;
    const styles = {
        sending: 'bg-blue-50 text-blue-700 border border-blue-200',
        success: 'bg-green-50 text-green-700 border border-green-200',
        error: 'bg-orange-50 text-orange-800 border border-orange-200'
    };
    status.className = `mt-4 rounded-xl p-4 text-sm font-medium ${styles[type] || styles.sending}`;
    status.innerHTML = messageHTML;
    status.classList.remove('hidden');
}

function setupGeneralContactForm() {
    const form = document.getElementById('general-contact-form');
    if (!form || form.dataset.bound) return;
    form.dataset.bound = 'true';

    form.addEventListener('submit', async event => {
        event.preventDefault();
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton?.textContent || 'Send Message';
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            submitButton.classList.add('opacity-75', 'cursor-wait');
        }
        showGeneralContactStatus('sending', '<i class="fa-solid fa-paper-plane mr-2"></i>Sending your message...');

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });
            let result = {};
            try { result = await response.json(); } catch (_) { result = {}; }
            if (!response.ok || result.success === false || result.success === 'false') {
                throw new Error(result.message || `Form service returned status ${response.status}`);
            }
            form.reset();
            showGeneralContactStatus('success', '<i class="fa-solid fa-circle-check mr-2"></i>Message received — thank you. I’ll reply as soon as possible.');
        } catch (error) {
            const subject = encodeURIComponent('Cypress Flips customer contact form error');
            const body = encodeURIComponent(`Hi, I tried to contact Cypress Flips but the website form failed.\n\nError: ${error?.message || 'Unknown error'}\n\nMy message:\n`);
            showGeneralContactStatus('error', `<i class="fa-solid fa-triangle-exclamation mr-2"></i>Your message could not be sent. Please try again, or <a class="underline font-bold" href="mailto:mjmorrisonusa@gmail.com?subject=${subject}&body=${body}">email me directly</a>.`);
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalText.trim() || 'Send Message';
                submitButton.classList.remove('opacity-75', 'cursor-wait');
            }
        }
    });
}

// Initial Setup
setupThemeToggle();
setupHeroMessage();
setupHeaderEffects();
setupBackToTop();
setupStaticNavigationListeners();
setupGeneralContactForm();
setupInventoryControls();
setupKeyboardShortcuts();
setupHourlyScripture();
setupScrollReveal();
renderPremiumInventory();
renderInventory();
renderListingsPage();
renderCategoriesPage();
