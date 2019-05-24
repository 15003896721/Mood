/*1:用户数据表*/
CREATE TABLE mood_user(
  id INT PRIMARY KEY AUTO_INCREMENT,
  nickName VARCHAR(128),
  avatarUrl VARCHAR(255)
);
/*2: 发表心情  mood_publish id imgs texts cheersCount*/
CREATE TABLE mood_publish(
  id INT PRIMARY KEY AUTO_INCREMENT,
  counts VARCHAR(128) DEFAULT 0,
  imgs VARCHAR(128),
  texts  VARCHAR(250),
  userId VARCHAR(255),
  timer VARCHAR(255)
);
insert into mood_publish VALUES(null,default,'http://127.0.0.1:3008/img/img01.jpg','你说你很累',1,'2019/05/20 15:01:22');
#2:添加二条测试数据
INSERT INTO mood_publish VALUES(1,default,'http://127.0.0.1:3008/img/img01.jpg','你说你很累，可谁又过得顺风顺水。',1,'2019/05/20 15:01:22');
INSERT INTO mood_publish VALUES(null,default,'http://127.0.0.1:3008/img/img02.jpg','一段不被接受的爱情，需要的不是伤心，而是时间，一段可以用来遗忘的时间。一颗被深深伤了的心，需要的不是同情，而是明白。',1,'2019/05/20 15:01:22');
INSERT INTO mood_publish VALUES(null,default,'http://127.0.0.1:3008/img/img03.jpg','征服畏惧、建立自信的最快最确实的方法，就是去做你害怕的事，直到你获得成功的经验。',1,'2019/05/20 15:01:22');
INSERT INTO mood_publish VALUES(null,default,'http://127.0.0.1:3008/img/img04.jpg','永远太远，谁能说得准？人都是会变的，我又怎生断言自己，只是，只要仍旧能让自己坚持，我便不会放松，这就够了。',1,'2019/05/20 15:01:22');
INSERT INTO mood_publish VALUES(null,default,'http://127.0.0.1:3008/img/img05.jpg','很多时候，一种习惯，继续习惯后，便什么也不是了，有的人，只想继续这种习惯，更多人，被另一种新鲜所吸引。总是要到说再见，才会想起从前。',1,'2019/05/20 15:01:22');
INSERT INTO mood_publish VALUES(null,default,'http://127.0.0.1:3008/img/img06.jpg','刹那间时光重溯，恍惚间十几年的繁华都化为灰烬，蓦然回首，记忆里的那一瞬间，竟然就是所谓的永远。',1,'2019/05/20 15:01:22');
INSERT INTO mood_publish VALUES(null,default,'http://127.0.0.1:3008/img/img07.jpg','薄荷花在古地球时代被认为是重逢的先兆，花语是‘愿与你再次相见’。',1,'2019/05/20 15:01:22');
INSERT INTO mood_publish VALUES(null,default,'http://127.0.0.1:3008/img/img08.jpg','我们有共同的回忆，我们有各自的未来。 谁也不必责怪谁，青春作伴，老来各散。 那些飘满雪的冬天，那个不带伞的少年，那句被门挡住的誓言，那串被雪覆盖的再见。',1,'2019/05/20 15:01:22');
INSERT INTO mood_publish VALUES(null,default,'http://127.0.0.1:3008/img/img09.jpg','你我虽未相约，但我为你而来。',1,'2019/05/20 15:01:22');
INSERT INTO mood_publish VALUES(null,default,'http://127.0.0.1:3008/img/img10.jpg','我们可以接受很多不如意，但无法接受曾经的不努力和不坚持。',1,'2019/05/20 15:01:22');
INSERT INTO mood_publish VALUES(null,default,'http://127.0.0.1:3008/img/img11.jpg','所谓的人间烟火，就是这样—个可以时而温暖时而冷漠的词语，所谓的人间，就是这样时而光明时而黑暗的时刻。',1,'2019/05/20 15:01:22');
INSERT INTO mood_publish VALUES(null,default,'http://127.0.0.1:3008/img/img06.jpg','无论你走得多远都走不出我的心，就像黄昏时分的树影，拖得再长，也离不开树的根。',1,'2019/05/20 15:01:22');
INSERT INTO mood_publish VALUES(null,default,'http://127.0.0.1:3008/img/img03.jpg','我们总是在错误的时间，错误的地点，懵懵然就爱上那个人。然后，不得不用尽一生，遗忘。',1,'2019/05/20 15:01:22');
INSERT INTO mood_publish VALUES(null,default,'http://127.0.0.1:3008/img/img11.jpg',' 渐渐发现，不需妄自菲薄，不要汲汲戚戚，不倾倒，不卑微，不依赖，不嫉妒，只需这样，就会遇到命定的那个人，即使没有遇到，也对得起自己，至少我在认真地生活。',1,'2019/05/20 15:01:22');
/*3： ======收藏数据表======*/
CREATE TABLE mood_collect(
  id INT PRIMARY KEY AUTO_INCREMENT,
  imgs VARCHAR(128),
  texts  VARCHAR(250),
  textId INT,
  userId INT
);

