<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <!--msb: main sidebar-->
  <div class="msb" id="msb">
    <nav class="navbar navbar-default" role="navigation">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <div class="brand-wrapper">
          <!-- Brand -->
          <div class="brand-name-wrapper">
            <a class="navbar-brand" href="#">
              DASHBOARD
            </a>
          </div>

        </div>

      </div>

      <!-- Main Menu -->
      <div class="side-menu-container">
        <ul class="nav navbar-nav">
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/about">About</RouterLink></li>
          <li><RouterLink to="/contacts">Contacts</RouterLink></li>
          <li><RouterLink to="/calendar">Calendar</RouterLink></li>
          <li><RouterLink to="/contact">Single Contact</RouterLink></li>

          <!-- Dropdown-->

        </ul>
      </div><!-- /.navbar-collapse -->
    </nav>
  </div>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
.principal{
  width: 75%;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    width: 25%;
    align: left;
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
body {
  margin-top: 50px;
  background-color: #fff;
  font-family: Arial, sans-serif;
  font-size: 14px;
  letter-spacing: 0.01em;
  color: #39464e;
}

.navbar-default {
  background-color: #FFF;
  margin-left: 200px;
}

/*main side bar*/
.msb {
  width: 200px;
  background-color: #F5F7F9;
  position: fixed;
  left: 0;
  top: 0;
  right: auto;
  min-height: 100%;
  overflow-y: auto;
  white-space: nowrap;
  height: 100%;
  z-index: 1;
  border-right: 1px solid #ddd;
  .navbar {
    border: none;
    margin-left: 0;
    background-color: inherit;
  }
  .navbar-header {
    width: 100%;
    border-bottom: 1px solid #e7e7e7;
    margin-bottom: 20px;
    background: #fff;
  }
  .navbar-nav {
    .panel {
      border: 0 none;
      box-shadow: none;
      margin: 0;
      background: inherit;
    }
    li {
      display: block;
      width: 100%;
      a {
        padding: 15px;
        color: #5f5f5f;
        .glyphicon, .fa {
          margin-right: 8px;
        }
      }
    }
  }
  .nb {
    padding-top: 5px;
    padding-left: 10px;
    margin-bottom: 30px;
    overflow: hidden;

  }
}
ul.nv,
ul.ns {
  position: relative;
  padding: 0;
  list-style: none;
}
.nv {
  li {
    display: block;
    position: relative;

    &::before {
      clear: both;
      content: "";
      display: table;
    }
    a {
      color: #444;
      padding: 10px 25px;
      display: block;
      vertical-align: middle;

      .ic {
        font-size: 16px;
        margin-right: 5px;
        font-weight: 300;
        display: inline-block;
      }
    }
  }
  /*ns: nav-sub*/
  .ns {
    li {
      a {
        padding: 10px 50px;
      }
    }

  }

}


/*main content wrapper*/
.mcw {
  margin-left: 200px;
  position: relative;
  min-height: 100%;

  /*content view*/
  .cv {
  }
}


/*globals*/
a,
a:focus,
a:hover {
  text-decoration: none;
}

.inbox {
  .container-fluid {
    padding-left: 0;
    padding-right: 0;
  }

  ul, li {
    margin: 0;
    padding: 0;
  }
  ul {
    li {
      list-style: none;
      a {
        display: block;
        padding: 10px 20px;
      }
    }
  }
}
.msb, .mnb {
  -moz-animation: slidein 300ms forwards;
  -o-animation: slidein 300ms forwards;
  -webkit-animation: slidein 300ms forwards;
  animation: slidein 300ms forwards;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}
.mcw {
  -moz-animation: bodyslidein 300ms forwards;
  -o-animation: bodyslidein 300ms forwards;
  -webkit-animation: bodyslidein 300ms forwards;
  animation: bodyslidein 300ms forwards;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}
body.msb-x {

  .mcw, .mnb {
    margin-left: 0;
    -moz-animation: bodyslideout 300ms forwards;
    -o-animation: bodyslideout 300ms forwards;
    -webkit-animation: bodyslideout 300ms forwards;
    animation: bodyslideout 300ms forwards;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
  }
  .msb {
    -moz-animation: slideout 300ms forwards;
    -o-animation: slideout 300ms forwards;
    -webkit-animation: slideout 300ms forwards;
    animation: slideout 300ms forwards;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
  }
}

/* Slide in animation */
@-moz-keyframes slidein {
  0% {
    left: -200px;
  }
  100% {
    left: 0;
  }
}
@-webkit-keyframes slidein {
  0% {
    left: -200px;
  }
  100% {
    left: 0;
  }
}
@keyframes slidein {
  0% {
    left: -200px;
  }
  100% {
    left: 0;
  }
}
@-moz-keyframes slideout {
  0% {
    left: 0;
  }
  100% {
    left: -200px;
  }
}
@-webkit-keyframes slideout {
  0% {
    left: 0;
  }
  100% {
    left: -200px;
  }
}
@keyframes slideout {
  0% {
    left: 0;
  }
  100% {
    left: -200px;
  }
}

@-moz-keyframes bodyslidein {
  0% {
    left: 0;
  }
  100% {
    margin-left: 200px;
  }
}
@-webkit-keyframes bodyslidein {
  0% {
    left: 0;
  }
  100% {
    left:0
  }
}
@keyframes bodyslidein {
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: 200px;
  }
}
@-moz-keyframes bodyslideout {
  0% {
    margin-left: 200px;
  }
  100% {
    margin-right: 0;
  }
}
@-webkit-keyframes bodyslideout {
  0% {
    margin-left: 200px;
  }
  100% {
    margin-left: 0;
  }
}
@keyframes bodyslideout {
  0% {
    margin-left: 200px;
  }
  100% {
    margin-left: 0;
  }
}
</style>
