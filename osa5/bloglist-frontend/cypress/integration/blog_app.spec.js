describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Kazuya Mishima',
      username: 'kassu',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Blogs')
    cy.contains('Login')
  })

  it('login form can be opened', function () {
    cy.contains('login').click()
  })

  it('user can login', function () {
    cy.contains('login').click()
    cy.get('#username').type('kassu')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('Kazuya Mishima logged in')
  })

  it('login fails with wrong password', function () {
    cy.contains('login').click()
    cy.get('#username').type('kassu')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.errorMessage').should('contain', 'wrong credentials')
    cy.get('html').should('not.contain', 'Kazuya Mishima logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.wait(1000)
      cy.login({ username: 'kassu', password: 'salainen' })
    })

    it('a new blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('a blog created by cypress')
      cy.get('#url').type('https://www.newblog.com/')
      cy.contains('save').click()
      cy.contains('a blog created by cypress')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.contains('create new blog').click()
        cy.get('#title').type('another blog created by cypress')
        cy.get('#author').type('a blog created by cypress')
        cy.get('#url').type('https://www.newblog.com/')
        cy.contains('save').click()
      })

      it('can like', function () {
        cy.contains('another blog created by cypress')
          .get('#view')
          .click()
          .get('#like')
          .click()

        cy.contains('likes: 1')
      })

      it('can delete blog', function () {
        cy.contains('another blog created by cypress')
          .get('#view')
          .click()
          .get('#delete')
          .click()

        cy.get('html').should('not.contain', 'another blog created by cypress')
      })
    })

    describe('sort blogs by order', function () {
      beforeEach(function () {
        cy.wait(1000)
        cy.createBlog({
          title: 'blog1',
          author: 'cypress',
          url: 'https://www.newblog.com/',
          likes: 0,
        })
        cy.wait(1000)
          .then(() =>
            cy.createBlog({
              title: 'blog2',
              author: 'cypress',
              url: 'https://www.newblog.com/',
              likes: 3,
            })
          )
        cy.wait(1000)
          .then(() =>
            cy.createBlog({
              title: 'blog3',
              author: 'cypress',
              url: 'https://www.newblog.com/',
              likes: 2,
            })
          )
      })

      it('shows blogs that is having most likes first', function () {
        cy.get('.blog').then((blogs) => {
          cy.wrap(blogs[0]).should('contain', 'blog2')
          cy.wrap(blogs[1]).should('contain', 'blog3')
          cy.wrap(blogs[2]).should('contain', 'blog1')
        })
      })
    })
  })
})

