const page_in = document.getElementById("page_loader");
const drpd_c = document.getElementById("drpd-content");
const data_container = document.getElementById("main_container");


function update_drpd() {
    if (drpd_c.style.display == "none") {
        drpd_c.style.setProperty('display', 'block');

    } else {
        drpd_c.style.setProperty('display', 'none');
    }
}

function change_page(page) {
    page_in.src = page
}

function put_data(data, container) {
  console.log(data)
  for (let d in data) {
    d = data[d];

    var actual = document.createElement("div");
    actual.classList.add("product-v0");

    container.appendChild(actual);

    var container_1 = document.createElement("div");
    container_1.classList.add("txtmiddle-v0");

    actual.appendChild(container_1);

    var name = document.createElement("h1");
    name.classList.add("title-product-v0");
    name.innerHTML = d.name;
    if (d.path != '#')
      name.onclick = () => {window.open(d.path, '_blank');};
    
    container_1.appendChild(name);

    var img = document.createElement("img");
    img.classList.add("perso-img-v0");
    img.src = d.img;
    
    container_1.appendChild(img);

    var liste = document.createElement("ul");
    liste.classList.add("liste-caract-v0");

    container_1.appendChild(liste);

    var l1 = document.createElement("li");
    l1.classList.add("list-cara-v0");
    l1.classList.add("basetext-v0");
    l1.classList.add("text-pres-v0");
    l1.innerHTML = `Language:<br/><br/>${d.language}`;

    liste.appendChild(l1);

    var l2 = document.createElement("li");
    l2.classList.add("list-cara-v0");
    l2.classList.add("basetext-v0");
    l2.classList.add("text-pres-v0");
    l2.innerHTML = `OS:<br/><br/>${d.compatibility}`;

    liste.appendChild(l2);

    var l3 = document.createElement("li");
    l3.classList.add("list-cara-v0");
    l3.classList.add("basetext-v0");
    l3.classList.add("text-pres-v0");
    l3.innerHTML = `Version:<br/><br/>${d.version}`;

    liste.appendChild(l3);

    var desc = document.createElement("p");
    desc.classList.add("text-desc-v0");
    desc.classList.add("basetext-v0");
    desc.classList.add("text-pres-v0");
    desc.innerHTML = `${d.description}`;

    container_1.appendChild(desc);

  }
}

function get_json_packages(callback) {
    fetch("../json/stored.json")
    .then(response => response.json())
    .then(json => callback(json));
}

if (data_container) {
  get_json_packages(function(data){
      put_data(data, data_container);
  });
}