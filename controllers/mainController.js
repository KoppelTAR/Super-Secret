const express = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const User = new mongoose.model('User');

exports.getMainPage = (req, res) => {
    res.render('index');
};

exports.getRegisterPage = (req, res) => {
    res.render('register');
};

exports.postRegister = (req, res) => {
    User.register({username: req.body.username}, req.body.password, (error, user) => {
        if (error) {
            console.log(error);
            res.redirect('/register')
        } else {
            passport.authenticate('local')(req, res, ()=> {
                res.render('secrets');
            });
        }
    });
};

exports.getLoginPage = (req, res) => {
    res.render('login');
};

exports.postLogin = (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.logIn(user, (error) => {
        if (error) {
            console.log(error);
            res.redirect('/login');
        } else {
            passport.authenticate('local')(req, res, ()=> {
                res.redirect('/secrets');
            });
        }
    });
};

exports.getSecretsPage =(req, res) => {
    if (req.isAuthenticated()) {
        res.render('secrets');
    } else {
        res.redirect('/');
    }
};

exports.userLogout=(req, res)=> {
    req.logout();
    res.redirect('/');
};