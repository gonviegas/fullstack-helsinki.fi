describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'John Doe',
      username: 'johndoe',
      password: 'pass1234'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.contains('login')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login')
      cy.get('#username').type('johndoe')
      cy.get('#password').type('pass1234')
      cy.get('#login-button').click()

      cy.get('.success').contains('User logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login')
      cy.get('#username').type('johndoe')
      cy.get('#password').type('pass')
      cy.get('#login-button').click()

      cy.get('.error').contains('Wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'johndoe', password: 'pass1234' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('This is a title')
      cy.get('#author').type('This is the author')
      cy.get('#url').type('www.this-is-a-url.com')
      cy.get('#create-blog-button').click()
      cy.contains('new Blog created')
    })

    describe('After creating a blog', function () {
      beforeEach(function () {
        const blog = {
          title: 'this is a title',
          author: 'this is an author',
          url: 'www.this-is-a-url.com'
        }
        cy.createBlog(blog)
      })

      it('Users can like a blog', function () {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('Blog updated')
      })
    })
  })
})
