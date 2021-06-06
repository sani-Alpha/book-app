import mongodb from 'mongodb';
import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import passport from 'passport';
import passportLocal from 'passport-local';
import cookieSession from 'cookie-session';
import LoggerConstructor from './src/Utility/logger';

const mongoclient = mongodb.MongoClient;

export {mongoclient, express, dotenv, bcrypt, passport, passportLocal, cookieSession, LoggerConstructor};
