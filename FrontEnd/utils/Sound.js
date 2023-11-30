export default function Sound(){
    music = null;
  
    this.music = play("soundtrack", {
        volume: volumeSetting,
        loop: true,
      });
      let volumeSetting = localStorage.getItem("soundTogg")
        ? parseFloat(localStorage.getItem("soundTogg"))
        : 1;
  
    
}