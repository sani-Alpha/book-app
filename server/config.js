import mongodb from 'mongodb';
import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import passport from 'passport';
import passportLocal from 'passport-local';
import cookieSession from 'cookie-session';
import {path, LoggerConstructor} from './src/Utility/logger';

const mongoclient = mongodb.MongoClient;

export {mongoclient, express, dotenv, bcrypt, path, passport, passportLocal, cookieSession, LoggerConstructor};
