import Ember from 'ember';
import DS from 'ember-data';

var Post = DS.Model.extend({
  title: DS.attr('string'),
  author: DS.attr('string'),
  content: DS.attr('string'),
  publishedAt: DS.attr('date')
});

Post.reopenClass({
  'FIXTURES': [{
    id: 1,
    title: 'First post',
    author: 'First author',
    publishedAt: new Date('12-27-2012'),
    content: 'First Content'
  }, {
    id: 2,
    title: 'Second post',
    author: 'second author',
    publishedAt: new Date('1-27-2012'),
    content: 'Second Content'
  }]
});

export default Post;
