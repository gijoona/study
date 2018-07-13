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

app.get('/menu', (req, res) => {
  db.select().from('PROGRAM_MENU').all().then(function(menuList){
    res.send();
  });

  // var data = {
  //             menus: [
  //               {id: '0', aClass: 'nav-link', title:'Dashboard', link:'index.html', icon:'table', text:'Dashboard'},
  //               {id: '1', aClass: 'nav-link', title:'Charts', link:'charts.html', icon:'chart-area', text:'Charts'},
  //               {id: '2', aClass: 'nav-link', title:'Tables', link:'tables.html', icon:'table', text:'Tables'},
  //               {
  //                 id: '3', aClass: 'nav-link nav-link-collapse collapsed', aToggle: 'collapse', title:'Components', link:'#collapseComponents', icon:'wrench', text:'Components', toggle: 'tooltip', isChild: true, childId:'collapseComponents', childUlClass: 'sidenav-second-level collapse',
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
