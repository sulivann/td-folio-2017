const projectsData = [
  {
    id: '1',
    name: 'Boucheron',
    slug: 'boucheron',
    type: 'redesign',
    date: '2016',
    env: 'school project',
    selected: true,
    released: true,
    imageCover: 'VISUS_BOUCHERON.jpg',
    desc:'The House of Boucheron is a French family dynasty founded by Frederic Boucheron in 1858. Boucheron makes watches, jewellery, and licenses its marque for perfumes. We were asked to rethink Boucheron digital presence by bringing clarity, luxury and an high-end approach to the current website.',
    show: [
      {
        image: 'BOUCHERON_1.jpg',
        label: 'Putting Boucheron’s know-how & popular products into the spotlight.'
      },
      {
        image: 'BOUCHERON_2.jpg',
        label: 'Built on a specific grid system.'
      },
      {
        image: 'BOUCHERON_3.jpg'
      },
      {
        image: 'BOUCHERON_4.jpg',
        label: 'Type anywhere to search a product.'
      },
      {
        image: 'BOUCHERON_5.jpg',
        label: 'Focusing on the product by allowing 360° view & imagery layout.'
      },
      {
        image: 'BOUCHERON_6.jpg'
      }
    ]
  },
  {
    id: '2',
    name: 'Anaïs Profit',
    slug: 'anais-profit',
    type: 'portfolio',
    date: '2016',
    env: 'personal project',
    selected: false,
    released: true,
    imageCover: 'VISUS_ANAIS.jpg',
    desc:'Anaïs is a french Graphic Designer based in Paris, specialized in print design and manual works such as paper works. We worked in collaboration in order to think of a way to showcase all of her creations into a portfolio.',
    show: [
      {
        image: 'ANAISPROFIT_1.jpg'
      },
      {
        image: 'ANAISPROFIT_2.jpg',
        label: 'Working on balance, white space & imagery.'
      },
      {
        image: 'ANAISPROFIT_3.jpg'
      },
      {
        image: 'ANAISPROFIT_4.jpg'
      },
      {
        image: 'ANAISPROFIT_5.jpg'
      },
      {
        image: 'ANAISPROFIT_6.jpg',
        label: 'Enabling horizontal scrolling.'
      },
      {
        image: 'ANAISPROFIT_7.jpg'
      },
      {
        image: 'ANAISPROFIT_8.jpg'
      },
      {
        image: 'ANAISPROFIT_9.jpg',
        label: 'Making it simple so the works showcased are the primary interest.'
      }
    ]
  },
  {
    id: '3',
    name: 'Airfrance',
    slug: 'airfrance',
    date: 'early 2016',
    env: 'school project',
    type: 'app',
    selected: false,
    released: true,
    imageCover: 'VISUS_AIRFRANCE.jpg',
    desc: 'Air France is an airline company which main activities are passenger transport, cargo and aircraft services. Their current app needed to be refreshed in order for users to have an easier access to the content  they are looking for. Also, we had to base our work on Air France’s visual identity guidelines.',
    show: [
      {
        image: 'AIRFRANCE_1.jpg',
        label: 'Looking through the app flow.'
      },
      {
        image: 'AIRFRANCE_2.jpg'
      },
      {
        image: 'AIRFRANCE_3.jpg',
        type: 'double-paragraph',
        firstLabel: 'After some initial sketches on paper, hi-fi wireframes were built after several shots.',
        secondLabel: '- We redesigned the flight booking process to fit into one screen.'
      },
      {
        image: 'AIRFRANCE_4.jpg'
      },
      {
        image: 'AIRFRANCE_5.jpg'
      },
      {
        image: 'AIRFRANCE_6.jpg',
        type: 'centered',
        firstLabel: 'Flight results are displayed with tags to show the ones with the lowest prices.',
        secondLabel: 'Users can quickly change dates to check for any other convenient dates.'
      },
      {
        image: 'AIRFRANCE_7.jpg'
      },
      {
        image: 'AIRFRANCE_8.jpg'
      },
      {
        image: 'AIRFRANCE_9.jpg'
      }
    ]
  },
  {
    id: '4',
    name: 'Repoleak - soon',
    slug: 'repoleak',
    selected: false,
    released: false,
    imageCover: 'VISUS_REPOLEAK.jpg'
  },
  {
    id: '5',
    name: 'Moodie',
    slug: 'moodie',
    date: '2016',
    env: 'school project',
    type: 'app',
    selected: false,
    released: true,
    imageCover: 'VISUS_MOODIE.jpg',
    desc: 'Moodie is an app based on your mobile applications & working with philips hue technology. Based on your activity, the song you play or you’re heartbeat : moodie adapt the light to suit your needs.',
    show: [
      {
        image: 'MOODIE_1.jpg',
        label: 'Automatically detecting your mood - if false, you might select the correct one.'
      },
      {
        image: 'MOODIE_2.jpg',
        label: 'Choose what applications to connect to the lamp'
      },
      {
        image: 'MOODIE_3.jpg'
      },
      {
        image: 'MOODIE_4.jpg'
      }
    ]
  }
];

module.exports = projectsData;
