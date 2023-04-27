'use strict'

class Gallery {
    constructor(gallery) {
        this.gallery = gallery;
        this.current = 0;
    }

    get AllPicture() {
        let temp = [];
        this.gallery.querySelectorAll('img').forEach(elem => {
            let obj = {};

            obj.url = elem.getAttribute('src');
            obj.title = elem.parentNode.dataset.title;
            obj.desc = elem.parentNode.dataset.description;

            temp.push(obj);
        })
        return temp;
    }

    generateModalWindow() {
        let str = `
        <div class="overlay none">
            <div class="modal">
                <img src="">
                <div class="text">
                    <h2></h2>
                    <p></p>
                    <div class="btn">
                        <div class="btn__prev"><svg><use xlink:href="sprite.svg#arrow"></svg></div>
                        <div class="btn__next"><svg><use xlink:href="sprite.svg#arrow"></svg></div>
                    </div>
                </div>
            </div>
        </div>`;

        document.body.insertAdjacentHTML('beforeend', str);
    }

    generateStyle() {
        let str = `
        <style>
        .overlay {
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.617);
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .modal {
            width: 960px;
            height: 427px;
            overflow: hidden;
            background-color: #fff;
            box-shadow:  0 0 10px #000;
            display: flex;
        }
        
        .modal img {
            width: 630px;
        }
        
        .text {
            font-size: 20px;
            padding: 44px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .btn {
            display: flex;
            justify-content: flex-end;
            gap: 48px;
        }

        .btn__prev,
        .btn__next {
            position: relative;
            z-index: 1;
            cursor: pointer;  
        }

        .btn__prev svg{
            position: relative;
            z-index: -1;
            width: 14px;
            height: 24px;
            transform: rotate(-180deg);
        }

        .btn__next svg{
            position: relative;
            z-index: -1;
            cursor: pointer; 
            width: 14px;
            height: 24px;
        }
        
        .none {
            display: none;
        }
        </style>`;
        document.head.insertAdjacentHTML('beforeend', str);
    }

    openModalWindow(even) {
        let target = even.target;

        if(target.matches('img')) {
            let targetUrl = target.getAttribute('src');
            let targetTitle = target.parentNode.dataset.title;
            let targetDescr = target.parentNode.dataset.description;

            document.querySelector('.btn__prev').style.visibility="visible";
            document.querySelector('.btn__next').style.visibility="visible";

            document.querySelector('.overlay').classList.remove('none');
            this.rechangeDataModal(targetUrl,targetTitle,targetDescr);

            if(targetUrl === this.AllPicture[this.AllPicture.length -1].url) {
                document.querySelector('.btn__next').style.visibility="hidden";
            } 
            if(targetUrl === this.AllPicture[0].url) {
                document.querySelector('.btn__prev').style.visibility="hidden";
            }
        }
    }

    changeSlide(even) {
        let target = even.target;
        let currentImg = document.querySelector('.modal img').getAttribute('src');
          
        if (target.matches('.btn__prev')) {
            let prevImgIndex = this.AllPicture.findIndex(el => el.url === currentImg) - 1;
          
            if (prevImgIndex >= 0) {
                let prevImgUrl = this.AllPicture[prevImgIndex].url;
                let prevImgTitle = this.AllPicture[prevImgIndex].title;
                let prevImgDescr = this.AllPicture[prevImgIndex].desc;
            
                this.rechangeDataModal(prevImgUrl,prevImgTitle,prevImgDescr);
            }
          
            if (prevImgIndex === 0) {
                document.querySelector('.btn__prev').style.visibility = 'hidden';
            }

            document.querySelector('.btn__next').style.visibility = 'visible';
        }

        if (target.matches('.btn__next')) {
            let prevImgIndex = this.AllPicture.findIndex(el => el.url === currentImg) + 1;
            
            if (prevImgIndex <= this.AllPicture.length -1) {
                let prevImgUrl = this.AllPicture[prevImgIndex].url;
                let prevImgTitle = this.AllPicture[prevImgIndex].title;
                let prevImgDescr = this.AllPicture[prevImgIndex].desc;
                    
                this.rechangeDataModal(prevImgUrl,prevImgTitle,prevImgDescr);
            }
            
            if (prevImgIndex === this.AllPicture.length -1) {
                document.querySelector('.btn__next').style.visibility = 'hidden';
            }

            document.querySelector('.btn__prev').style.visibility = 'visible';
        }
    }

    closeModalWindow(even) {
        if(even.target.matches('.overlay')) {
            even.target.classList.add('none');
        }
    }

    rechangeDataModal(elUrl,elTitl,elDescr) {
        document.querySelector('.modal img').setAttribute('src', elUrl);
        document.querySelector('.text h2').innerText = elTitl;
        document.querySelector('.text p').innerText = elDescr;
    }

    init() {
        console.dir(this);
        this.generateModalWindow();
        this.generateStyle();
        this.gallery.classList.add('gallery');
        this.gallery.addEventListener('click', this.openModalWindow.bind(this));
        document.body.addEventListener('click', this.closeModalWindow.bind(this));
        document.querySelector('.btn').addEventListener('click', this.changeSlide.bind(this));
    }
}

const g = document.querySelector('.gallery__items');

const gallery = new Gallery(g);
gallery.init();