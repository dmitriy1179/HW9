//1
function jsonInTable1(domEl, jsonEl) {
        let table, tr, td;
        table = document.createElement("table");
        table.border = "1";
        table.style.textAlign = "center";
        for (let i in jsonEl) {
            tr = document.createElement("tr");
            td = document.createElement("td");
            td.innerText = (i);
            tr.appendChild(td);
            td = document.createElement("td");
            td.innerText = (jsonEl[i]);
            tr.appendChild(td);
            table.appendChild(tr)
        }
        domEl.appendChild(table)
}

fetch('https://swapi.dev/api/people/1/')
    .then(res => res.json())
    .then(luke => jsonInTable1(el, luke))

//2
function jsonInTable(domEl, jsonEl) {
        let table, tr, td;
        table = document.createElement("table");
        table.border = "1";
        table.style.textAlign = "center";
        table.style.width = "100%"
        for (let [key, value] of Object.entries(jsonEl)) {
            tr = document.createElement("tr");
            td = document.createElement("td");
            td.innerText = key;
            tr.appendChild(td);
            if (typeof value === "object") {
                td = document.createElement("td");
                for (let i of value) {
                    if (i.includes("http://swapi.dev/api/")) {
                        let button1 = document.createElement("button");
                        button1.innerText = i;
                        button1.onclick = () => {
                            let domEl2 = document.createElement("div");
                            fetch(i)
                                .then(res1 => res1.json())
                                .then(jsonEl1 => jsonInTable(domEl2, jsonEl1))
                            button1.parentElement.appendChild(domEl2)
                            button1.remove()
                        }
                        td.appendChild(button1);
                    } else {
                        let div = document.createElement("div");
                        div.innerText = i;
                        td.appendChild(div);
                    }
                }
                tr.appendChild(td);
                table.appendChild(tr);
            }
            else if (`${value}`.includes("http://swapi.dev/api/")) {
                td = document.createElement("td");
                let button = document.createElement("button");
                button.innerText = value;
                button.onclick = () => {
                    let domEl1 = document.createElement("div")
                    fetch(value)
                        .then(res => res.json())
                        .then(jsonEl => jsonInTable(domEl1, jsonEl))
                   
                    button.parentElement.appendChild(domEl1);
                    button.remove()
                }
                td.appendChild(button);
                tr.appendChild(td);
                table.appendChild(tr);
            } else {
                td = document.createElement("td");
                td.innerText = value;
                tr.appendChild(td);
                table.appendChild(tr)
            }       
         }
        domEl.appendChild(table)
}

fetch('https://swapi.dev/api/people/1/')
    .then(res => res.json())
    .then(luke => jsonInTable(el, luke))

//3
function myfetch(url) {
    return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.onerror = () => reject(new Error(`Ошибка ${xhr.statusText}`));
        xhr.open("GET", url, true);
        xhr.onreadystatechange = () => {
            if (xhr.status != 200) { 
                reject(new Error(`Ошибка ${xhr.status}`))
            } else {
                xhr.onload = () => resolve(JSON.parse(xhr.responseText));
            }
        }
        xhr.send();
    });
}

myfetch('https://swapi.dev/api/people/1/')
    .then(luke => console.log(luke))

//4
const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))
console.log(Promise.race([delay(500), myfetch('https://swapi.dev/api/people/1/')]))
