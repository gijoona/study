const PORT = 3000;
const express = require('express');
const app = express();

// orient DB
const OrientDB = require('orientjs');
const dbServ = OrientDB({
  host: 'localhost',
  port: 2424,
  username: 'root',
  password: '1213'
});
var db = dbServ.use('HITOPS');

app.get('/', (req, res) => {
  res.send('success');
});

app.get('/menulist', (req, res) => {
  // TODO :: Depth 1인 메뉴를 리스트 조회 및 child 메뉴 처리
  db.query('traverse out(child) from (select *, out(child).include('*') as child from FRM_MENU where level = 1) maxdepth 0').then(function(results){
    // var menuList = [];
    for(var idx in results){
      console.log(results[idx]);
    }
    res.send(results);
  });

  app.get('/breadcrumb/:id', (req, res) => {
    console.log(req.params.id);
  });

  // var data = {
  //             menus: [
  //               {id: '0', title:'Dashboard', link:'index.html', icon:'table', text:'Dashboard'},
  //               {id: '1', title:'Charts', link:'charts.html', icon:'chart-area', text:'Charts'},
  //               {id: '2', title:'Tables', link:'tables.html', icon:'table', text:'Tables'},
  //               {
  //                 id: '3', title:'Components', link:'#collapseComponents', icon:'wrench', text:'Components', isChild: true, childId:'collapseComponents', childUlClass: 'sidenav-second-level collapse',
  //                 child: [
  //                   {id: '3-1', link: 'navbar.html', text: 'Navbar'},
  //                   {id: '3-2', link: 'cards.html', text: 'Cards'}
  //                 ]
  //               },
  //               {
  //                 id: '4', aClass: 'nav-link nav-link-collapse collapsed', aToggle: 'collapse', title:'Example Pages', link:'#collapseExamplePages', icon:'file', text:'Example Pages', isChild: true, childId:'collapseExamplePages', childUlClass: 'sidenav-second-level collapse',
  //                 child: [
  //                   {id: '4-1', link: 'login.html', text: 'Login Page'},
  //                   {id: '4-2', link: 'register.html', text: 'Registration Page'},
  //                   {id: '4-3', link: 'forgot-password.html', text: 'Forgot Password Page'},
  //                   {id: '4-4', link: 'blank.html', text: 'Blank Page'}
  //                 ]
  //               },
  //               {
  //                 id: '5', aClass: 'nav-link nav-link-collapse collapsed', aToggle: 'collapse', title:'Menu Levels', link:'#collapseMulti', icon:'sitemap', text:'Menu Levels', isChild: true, childId:'collapseMulti', childUlClass: 'sidenav-second-level collapse',
  //                 child: [
  //                   {id: '5-1', link: '#', text: 'Second Level Item1'},
  //                   {id: '5-2', link: '#', text: 'Second Level Item2'},
  //                   {id: '5-3', link: '#', text: 'Second Level Item3'},
  //                   {id: '5-4', aClass:"nav-link-collapse collapsed", aToggle: 'collapse', link: '#collapseMulti2', text: 'Third Level', isChild: true, childId: 'collapseMulti2', childUlClass: 'sidenav-third-level collapse',
  //                     child: [
  //                       {id: '5-4-1', link: '#', text: 'Third Level Item1'},
  //                       {id: '5-4-2', link: '#', text: 'Third Level Item2'},
  //                       {id: '5-4-3', link: '#', text: 'Third Level Item3'}
  //                     ]
  //                   }
  //                 ]
  //               },
  //               {id: '6', aClass: 'nav-link', title:'Link', link:'#', icon:'link', text:'Link'}
  //             ]
  //           };
  //
  // res.send(data);
});

app.listen(PORT, () => {
  console.log(`server listen PORT: ${ PORT }`);
});
