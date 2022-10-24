// ==UserScript==
// @name         fofa_filter_plus
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  fofa过滤器_plus
// @author       Komomon
// @match        https://fofa.info/result*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=fofa.info
// @require https://code.jquery.com/jquery-2.1.4.min.js
// @grant        none
// @license      MIT
// ==/UserScript==

setTimeout(() => {
    'use strict';
    const div = document.querySelector("div.el-autocomplete") //fofa input div
    //const hoo = String()
    //console.log(ho)
    //console.log(hoo)
    div.insertAdjacentElement("afterend", hostbutton) //insert knife button1
    div.insertAdjacentElement("afterend", titlebutton) //sword button2
    div.insertAdjacentElement("afterend", ipbutton) //
    // div.insertAdjacentElement("afterend", previouspagebutton) //
    // div.insertAdjacentElement("afterend", nextpagebutton) //

    hostbutton.addEventListener("click", () => {
        const hosts = new Set()
        document.querySelectorAll("span.aSpan > a").forEach(host => {
            hosts.add(host.textContent.trim().split("://").slice(-1)[0])
            //console.log(host.textContent.trim())
        })
        let qbase64 = A2B(new URL(location.href).searchParams.get("qbase64"))
        hosts.forEach(host => {
            qbase64 += ` && host!="${host}"`
        })
        qbase64 = B2A(qbase64)
        const url = new URL(location.origin+location.pathname)
        url.searchParams.set("qbase64", qbase64)
        location.replace(url.href)
    })
    titlebutton.addEventListener("click", () => {
        const titles = new Set()
        document.querySelectorAll("p.max-tow-row").forEach(title => {
            titles.add(title.textContent)
        })
        let qbase64 = A2B(new URL(location.href).searchParams.get("qbase64"))
        titles.forEach(title => {
            //ignore empty title because many different targets set empty title
            (title != "") && (qbase64 += ` && title!="${title}"`)
        })
        qbase64 = B2A(qbase64)
        const url = new URL(location.origin+location.pathname)
        url.searchParams.set("qbase64", qbase64)
        location.replace(url.href)
    })
    ipbutton.addEventListener("click", () => {
        const ips = new Set()
        //document.querySelectorAll("div.innerContentLeft")[1].querySelectorAll("p")[1]
        document.querySelectorAll("div.innerContentLeft").forEach(divv => {
            var ip = divv.querySelectorAll("p > a.jumpA")[0].textContent.trim()
            ips.add(ip)
            //console.log(ip)
        })
        let qbase64 = A2B(new URL(location.href).searchParams.get("qbase64"))
        ips.forEach(ip => {
            //ignore empty title because many different targets set empty title
            (ip != "") && (qbase64 += ` && ip!="${ip}"`)
        })
        qbase64 = B2A(qbase64)
        const url = new URL(location.origin+location.pathname)
        url.searchParams.set("qbase64", qbase64)
        location.replace(url.href)
    })
    //pagenumber button hook
    $(document).on("click","li.number",function(){
        // alert("taped")
        setTimeout(() => {
            // let nowpagenumber = Number(document.querySelector("li.number.active").textContent.trim())
            let nowpagenumber =$("li.number.active").text()
            var result = `Pagenumber:${nowpagenumber} result\n`
            document.querySelectorAll("span.aSpan > a").forEach(host => {
                //ho.add(host.textContent.trim())
                result = result + host.textContent.trim() + "\n"
            })
            console.log(result)
        }, 3000)

    })
    // previouspagebutton.addEventListener("click", () => {
    //     let pagelist = document.querySelectorAll("li.number")
    //     let maxpagenumber = Number(pagelist[pagelist.length - 1].textContent.trim())
    //     // console.log(pagelist)
    //     let nowpagenumber = Number(document.querySelector("li.number.active").textContent.trim())
    //     // console.log(nowpagenumber, maxpagenumber)
    //     //// get nowpageSubscript
    //     // var nowpageSubscript = 0
    //     // for (var i = 0; i < pagelist.length; i++) {
    //     //     if (pagelist[i].classList.contains('active') == true) {
    //     //         // console.log(pagelist[i].textContent.trim())
    //     //         nowpageSubscript = i
    //     //         // var nowpagenode = pagelist[i]
    //     //         break
    //     //     }
    //     // }
    //     if (nowpagenumber > 1) {
    //         // document.querySelectorAll("li.number")[nowpagenumber + 1].click()
    //         // nowpagenode.click()
    //         //pagelist[nowpageSubscript - 1].click()
    //         // console.log(nowpageSubscript)
    //         document.querySelector('button.btn-prev').click()
    //         setTimeout(() => {
    //             var result = `Pagenumber:${nowpagenumber-1} result\n`
    //             document.querySelectorAll("span.aSpan > a").forEach(host => {
    //                 //ho.add(host.textContent.trim())
    //                 result = result + host.textContent.trim() + "\n"
    //             })
    //             console.log(result)
    //         }, 3000)
    //     }
    // })
    // nextpagebutton.addEventListener("click", () => {

    //     let pagelist = document.querySelectorAll("li.number")
    //     let maxpagenumber = Number(pagelist[pagelist.length - 1].textContent.trim())
    //     // console.log(pagelist)
    //     let nowpagenumber = Number(document.querySelector("li.number.active").textContent.trim())
    //     // console.log(nowpagenumber, maxpagenumber)
    //     //get nowpageSubscript
    //     //var nowpageSubscript = 0
    //     // for (var i = 0; i < pagelist.length; i++) {
    //     //     if (pagelist[i].classList.contains('active') == true) {
    //     //         // console.log(pagelist[i].textContent.trim())
    //     //         nowpageSubscript = i
    //     //         // var nowpagenode = pagelist[i]
    //     //         break
    //     //     }
    //     // }
    //     if (nowpagenumber < maxpagenumber) {
    //         // document.querySelectorAll("li.number")[nowpagenumber + 1].click()
    //         // nowpagenode.click()
    //         // pagelist[nowpageSubscript + 1].click()
    //         // console.log(nowpageSubscript)
    //         document.querySelector('button.btn-next').click()
    //         setTimeout(() => {
    //             var result = `Pagenumber:${nowpagenumber+1} result\n`
    //             document.querySelectorAll("span.aSpan > a").forEach(host => {
    //                 //ho.add(host.textContent.trim())
    //                 result = result + host.textContent.trim() + "\n"
    //             })
    //             console.log(result)
    //         }, 3000)
    //     }
    // })
    //output host
    // setTimeout(() => {
    // output now page hosts
    var nowpagenumber =$("li.number.active").text()
    var result = `Pagenumber:${nowpagenumber} result\n`
    var ho = new Set()
    document.querySelectorAll("span.aSpan > a").forEach(host => {
        ho.add(host.textContent.trim())
    })
    for (var v of ho) {
        result = result + v.trim() + "\n"
    }
    console.log(result)
    // }, 2000)
}
, 2000)


const style = document.createElement("style")
style.innerHTML = `
  .conix-button {
    position: absolute;
    margin-left: 20px;
    height: 50px;
    color: #05f2f2;
    padding: 0 5px;
    white-space: nowrap;
    font-size: xx-large;
    background-color: transparent;
    border: none;
    transition: transform .5s;
  }
  .conix-button:hover {
    cursor: pointer;
    transform: rotate(135deg);
  }
  .knife {
    margin-left: 0px;
  }
  .sword {
    margin-left: 50px;
  }
  .ip {
    margin-left: 84px;
  }
  .previouspagebutton{
    margin-left: 124px;
  }
  .nextpagebutton{
    margin-left: 150px;
  }
  `
document.head.appendChild(style)

const hostbutton = document.createElement("button")
hostbutton.className = "conix-button knife"
hostbutton.textContent = "HO"
hostbutton.title = "Kill This Page By Host"

const titlebutton = document.createElement("button")
titlebutton.className = "conix-button sword"
titlebutton.textContent = "TI"
titlebutton.title = "Kill All Same Title"

const ipbutton = document.createElement("button")
ipbutton.className = "conix-button ip"
ipbutton.textContent = "IP"
ipbutton.title = "Kill All Same IP"



// const previouspagebutton = document.createElement("button")
// previouspagebutton.className = "conix-button previouspagebutton"
// previouspagebutton.textContent = "<"
// previouspagebutton.title = "previous page and Get host"

// const nextpagebutton = document.createElement("button")
// nextpagebutton.className = "conix-button nextpagebutton"
// nextpagebutton.textContent = ">"
// nextpagebutton.title = "next page and Get host"


/**
 * Binary To Ascii (Palin To Base64) supporting Chinese
 * @param {string} str
 * @returns
 */
function B2A(str) {
    return window.btoa(unescape(encodeURIComponent(str)))
}

/**
 * Ascii To Binary (Base64 To Plain) supporting Chinese
 * @param {string} str
 * @returns
 */
function A2B(str) {
    return decodeURIComponent(escape(window.atob(str)));
}




/* <div class="mainRightSideContainer el-scrollbar__view" style="
    padding-left: 10px;
">
<textarea style="width: 140px; height: 351px;">https://198.162.79.114
</textarea>
</div> */





