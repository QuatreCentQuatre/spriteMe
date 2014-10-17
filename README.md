#spriteMe

An easy tool to make sprite animation easier

---

### Dependencies

**jQuery-1.9.1 ++** (http://jquery.com/download/)

---

### Getting Started

Place the **spriteMe.js** file in your default JavaScript vendor directory. Link the script before the end of your **body** and after **jquery.js**.

```
<script src="js/vendor/jquery-1.10.2.min.js"></script>
<script src="js/vendor/spriteMe.js"></script>
```
Here you go ! You're now ready to use validateMe. Here how to get started !

#### HTML:
~~~
//Can be used on background or an image
<div id="bgSprite"></div>
<div id="img-ctn">
    <img id="imgSprite" src="img/image-name.png" alt=""/>
</div>
~~~

#### Javascript:

```
//Parameters
//-width: Width of the sprite
//-height: Height of the sprite
//-frameWidth: Width of one single frame
//-frameHeight: Height of one single frame
//-totalFrame: Number of frames in the spriteSheet
//-loop: -1 for infinite, 1 to xx for a defined number of plays. Default: 1.

this.spriteMe = new Me.sprite($('#bgSprite'),{width:500, height:500, frameWidth:50, frameHeight:50, totalFrame:100, loop:-1});
this.spriteMe.play();

this.spriteMe = new Me.sprite($('#imgSprite'),{width:500, height:500, frameWidth:50, frameHeight:50, totalFrame:100, loop:-1});
this.spriteMe.play();

```
---