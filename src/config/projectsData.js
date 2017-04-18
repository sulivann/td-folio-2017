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
        label: 'yo'
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
    desc:'Anaïs is a french Graphic Designer based in Paris, specialized in print design and manual works such as paper works. We worked in collaboration in order to think of a way to showcase all of her creations into a portfolio.'
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
    desc: 'Air France is an airline company which main activities are passenger transport, cargo and aircraft services. Their current app needed to be refreshed in order for users to have an easier access to the content  they are looking for. Also, we had to base our work on Air France’s visual identity guidelines.'
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
    desc: 'Moodie is an app based on your mobile applications & working with philips hue technology. Based on your activity, the song you play or you’re heartbeat : moodie adapt the light to suit your needs.'
  }
];

module.exports = projectsData;
