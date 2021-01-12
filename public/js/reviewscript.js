const reviews = [
    {
      id: 1,
      name: "Aazad",
      job: "full stack developer",
      img:
        "images/aazad.jpg",
      text:
        "I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry",
    },
    {
      id: 2,
      name: "Shawon",
      job: "Graphic designer",
      img:
        "images/shawon.jpg",
      text:
        "Helvetica artisan kinfolk thundercats lumbersexual blue bottle. Disrupt glossier gastropub deep v vice franzen hell of brooklyn twee enamel pin fashion axe.photo booth jean shorts artisan narwhal.",
    },
    {
      id: 3,
      name: "Shahidur",
      job: "web designer",
      img:
        "images/shahid.jpg",
      text:
        "Sriracha literally flexitarian irony, vape marfa unicorn. Glossier tattooed 8-bit, fixie waistcoat offal activated charcoal slow-carb marfa hell of pabst raclette post-ironic jianbing swag.",
    },
    {
      id: 4,
      name: "Al-Amin",
      job: "web developer",
      img:
        "images/alamin.jpg",
      text:
        "Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic. ",
    },
  ];

  const img = document.getElementById('person-img');
  const author = document.getElementById('author');
  const job = document.getElementById('job');
  const info = document.getElementById('info');

  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const randomBtn = document.querySelector('.random-btn');
  
  let currentItem = 0;

  window.addEventListener('DOMContentLoaded', () => {
    const item = reviews[currentItem];
    img.src = item.img;
    author.textContent = item.name;
    job.textContent = item.job;
    info.textContent = item.text;
  });

  function showPerson(person) {
      const item = reviews[currentItem];
      img.src = item.img;
      author.textContent = item.name;
      job.textContent = item.job;
      info.textContent = item.text;
  }

  nextBtn.addEventListener('click', () => {
      currentItem++;
      if(currentItem > reviews.length -1) {
          currentItem = 0;
      }
      showPerson(currentItem);
  });

  prevBtn.addEventListener('click', () => {
      currentItem--;
      if(currentItem < 0) {
          currentItem = reviews.length - 1;
      }
      showPerson(currentItem);
  });

  randomBtn.addEventListener('click', () => {
      currentItem = Math.floor(Math.random() * reviews.length);
      showPerson(currentItem);
  });