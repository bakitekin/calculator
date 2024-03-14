// HTML'den gerekli elementleri seçme
const spendingInput = document.querySelector("#spending-input");
const priceInput = document.querySelector("#price-input");
const formBtn = document.querySelector(".btn");
const list = document.querySelector(".list");
const totalInfo = document.querySelector("#total-info");
const statusCheck = document.querySelector("#status-input");
const selectFilter = document.querySelector("#filter-select");

// Form butonuna, liste öğelerine ve filtre seçimine event listener'lar eklenmesi
formBtn.addEventListener("click", addExpense);
list.addEventListener("click", handleClick);
selectFilter.addEventListener("change", handleFilter);

// Toplam gider miktarını takip etmek için global değişken
let total = 0;

// Gider miktarını güncelleyen fonksiyon
function updateTotal(price) {
  total += Number(price);
  totalInfo.textContent = total;
}

// Form butonuna tıklanınca çağrılan fonksiyon
function addExpense(e) {
  // Formun varsayılan davranışını engelleme
  e.preventDefault();

  // Boş girişlerin kontrolü
  if (!priceInput.value || !spendingInput.value) {
    alert("Boş Gider Ekleyemezsin!");
    return;
  }

  // Yeni bir gider öğesi oluşturma ve listeye ekleme
  const spendingDiv = document.createElement("div");

  spendingDiv.classList.add("spending");

  if (statusCheck.checked) {
    spendingDiv.classList.add("payed");
  }

  spendingDiv.innerHTML = `<h2>${spendingInput.value} =</h2>
    <h2 id="value">${priceInput.value}</h2>
    <div class="buttons">
        <img id="remove" src="image/remove.png" alt="">
    </div>`;

  list.appendChild(spendingDiv);

  // Toplam gider miktarını güncelleme
  updateTotal(priceInput.value);

  //  Giriş alanlarını temizleme
  spendingInput.value = "";
  priceInput.value = "";
}

// Liste üzerinde yapılan tıklamaları ele alan fonksiyon
function handleClick(e) {
  // Tıklanan elementin alınması
  const element = e.target;

  // Eğer tıklanan elementin id'si "remove" ise
  if (element.id === "remove") {
    // Silinecek öğenin üstteki iki üst ebeveynini al
    const wrapper = element.parentElement.parentElement;

    // Silinecek öğenin değerini al
    const deletedPrice = wrapper.querySelector("#value").innerText;

    // Toplam giderden silinecek değeri çıkartma
    updateTotal(-Number(deletedPrice));

    // Öğeyi listeden kaldırma
    wrapper.remove();
  }
}

// Filtre değişikliklerini ele alan fonksiyon

function handleFilter(e) {
  console.log(e.target.value);

  const items = Array.from(list.childNodes); // NodeList'i bir diziye dönüştürmek için Array.from kullanılır.
  items.forEach((item) => {
    // forEach fonksiyonunun parantezi düzeltilmeli.
    switch (e.target.value) {
      case "all":
        item.style.display = "flex";
        break;

      case "payed":
        if (!item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;

      case "not-payed":
        if (item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;
    }
  });
}
