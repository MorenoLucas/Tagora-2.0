export class Event {

  id: number;
  postNombre: String;
  postImg: String;
  Descripcion: String;
  date: Date;
  hour: number[2];
  likes: number;

  constructor(postName, postImg, description, tags, UserID, likes, hourOfEvent, minutesOfEvent, date){
    this.postNombre = postName;
    this.postImg = postImg;
    this.Descripcion = description;
    this.likes = likes;
    this.date = date;
    this.hour = [hourOfEvent, minutesOfEvent];
  }
}
