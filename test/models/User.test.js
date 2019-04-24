require('dotenv').config();
const mongoose = require('mongoose');
const { User } = require('../../lib/models/User');

describe('User model', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/tardygram', {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true
    });
  });
  
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('has a username, password,hash, and prof photo', () => {
    const user = new User({
      username: 'Cool Thing',
      password: 'password',
      profilePhotoUrl: 'string.jpg'
    });

    expect(user.toJSON()).toEqual({
      username: 'Cool Thing',
      profilePhotoUrl: 'string.jpg',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
});
