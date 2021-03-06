import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getLoginPage(key): string {
    return `
      <html>
      <head>
        <meta charset="utf-8">
        <title>Auth</title>
        <base href="/">
        <link rel="icon" type="image/x-icon" href="favicon.ico">
        
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/site.webmanifest">
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
        <meta name="msapplication-TileColor" content="#ffffff">
        <meta name="theme-color" content="#ffffff">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <!-- Material Design for Bootstrap fonts and icons -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons">
    
        <!-- Material Design for Bootstrap CSS -->
        <link rel="stylesheet" href="https://unpkg.com/bootstrap-material-design@4.1.1/dist/css/bootstrap-material-design.min.css" integrity="sha384-wXznGJNEXNG1NFsbm0ugrLFMQPWswR3lds2VeinahP8N0zJw9VWSopbjv2x7WCvX" crossorigin="anonymous">

        <style>
          html, body {
            height: 100%;
            width: 100%;
            overflow: hidden;
          }
          .layout {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100%;
          }
          .layout__form {
            position: relative;
            z-index: 5;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .layout__placeholder {
            position: absolute;
            z-index: 1;
            pointer-events: none;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
          }
          .layout__placeholder-inner {
            line-height: 1;
            overflow: hidden;
            font-size: calc(100vw / 5.7);
            margin-left: -.07em;
            margin-bottom: -.22em;
            font-weight: bold;
            background: -webkit-gradient(linear,left top,right top,from(#4c4a4a),color-stop(25%,#000000),to(#4c4c4c));
            background: linear-gradient(to top right,#4c4a4a 0,#000000 25%,#4c4c4c 50%);
            background-clip: border-box;
            background-size: 200% auto;
            text-fill-color: transparent;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .form-group {
            margin-bottom: 15px;
            padding-top: 5px;
          }
        </style>
      </head>
      <body>
        <div class="layout__placeholder">
          <div class="layout__placeholder-inner">MadBrothers</div>
        </div>
        <div class="layout">
          <form class="layout__form" action="/" method="post">
            <div class="form-group">
              <input type="text" name="username" class="form-control" id="username" aria-describedby="usernameHelp" placeholder="Enter username">
            </div>
            <div class="form-group">
              <input type="password" class="form-control" id="password" name="password" placeholder="Password">
            </div>
            <input type="hidden" name="key" value="${key}"/>
            <input type="hidden" name="lastname" value=""/>  
            
            <button class="btn btn-primary" type="submit">Login</button>
          </form>
        </div>
        
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://unpkg.com/popper.js@1.12.6/dist/umd/popper.js" integrity="sha384-fA23ZRQ3G/J53mElWqVJEGJzU0sTs+SvzG8fXVWP+kJQ1lwFAOkcUOysnlKJC33U" crossorigin="anonymous"></script>
        <script src="https://unpkg.com/bootstrap-material-design@4.1.1/dist/js/bootstrap-material-design.js" integrity="sha384-CauSuKpEqAFajSpkdjv3z9t8E7RlpJ1UP0lKM/+NdtSarroVKu069AlsRPKkFBz9" crossorigin="anonymous"></script>
        <script>$(document).ready(function() { $('body').bootstrapMaterialDesign(); });</script>
      </body>
</html> 


    `;
  }
}
