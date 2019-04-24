const mongoose = require('mongoose');
const Post = require('../../lib/models/Post');

describe('Post model', () => {
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

  it('has user ref, photo URL, caption, and an array of tags', () => {
    const post = new Post({
      user: new mongoose.Types.ObjectId(),
      photoUrl: 'string.jpg',
      caption: 'hi there',
      tags: ['hi', 'fun']
    });

    expect(post.toJSON()).toEqual({
      user: expect.any(mongoose.Types.ObjectId),
      photoUrl: 'string.jpg',
      caption: 'hi there',
      tags: ['hi', 'fun'],
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has a required user and photo URL fields', () => {
    const post = new Post({
      caption: 'hi there',
      tags: ['hi', 'fun']
    });
    
    const errors = post.validateSync().errors;
    expect(errors.user.message).toEqual('Path `user` is required.');
    expect(errors.photoUrl.message).toEqual('Path `photoUrl` is required.');
  });
});
