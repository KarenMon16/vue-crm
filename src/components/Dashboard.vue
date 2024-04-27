<script setup>

import {RouterLink} from "vue-router";
import 'bootstrap/dist/css/bootstrap.min.css';
</script>

<template>

  <div class="msb" id="msb">
    <nav class="navbar navbar-default" role="navigation">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <div class="brand-wrapper">
          <!-- Brand -->
          <div class="brand-name-wrapper">
            <a class="navbar-brand">
              Dashboard
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
</template>

<style >

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
      padding: 15%;
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

</style>