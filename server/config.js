import mongodb from 'mongodb';
import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import passportLocal from 'passport-local';
import cookieSession from 'cookie-session';
import axios from 'axios';
import shajs from 'sha.js';
import {path, LoggerConstructor} from './src/Utility/logger';

const mongoclient = mongodb.MongoClient;

export {mongoclient, express, dotenv, path, passport, passportLocal, axios, shajs, cookieSession, LoggerConstructor};
