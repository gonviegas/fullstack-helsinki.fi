describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const mainUser = {
      name: 'John Doe',
      username: 'johndoe',
      password: 'pass1234'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, mainUser)

    const altUser = {
      name: 'Luke Smith',
      username: 'lukesmith',
      password: 'notarealpass'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, altUser)

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

    it('a blog can be created', function () {
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

      it('users can like a blog', function () {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('Blog updated')
      })

      it('user that created the blog can delete it', function () {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.contains('Blog deleted')
      })

      it('user that did not created the blog, cannot see the delete button', function () {
        cy.contains('logout').click()
        cy.login({ username: 'lukesmith', password: 'notarealpass' })
        cy.contains('view').click()
        cy.contains('remove').should('not.exist')
      })
    })
    describe('After creating three blogs', function () {
      beforeEach(function () {
        const blog1 = {
          title: 'blog with most likes',
          author: 'this is an author',
          url: 'www.this-is-a-url.com'
        }
        cy.createBlog(blog1)

        const blog2 = {
          title: 'blog with least likes',
          author: 'this is an author',
          url: 'www.this-is-a-url.com'
        }
        cy.createBlog(blog2)

        const blog3 = {
          title: 'blog with average likes',
          author: 'this is an author',
          url: 'www.this-is-a-url.com'
        }
        cy.createBlog(blog3)
      })

      it('check if blogs are sorted by likes in descending order', function () {
        addLikes('average likes', 5)
        addLikes('least likes', 1)
        addLikes('most likes', 7)
        cy.get('.blog').eq(0).should('contain', 'most likes')
        cy.get('.blog').eq(1).should('contain', 'average likes')
        cy.get('.blog').eq(2).should('contain', 'least likes')
      })
    })
  })
})

let value = 0
const addLikes = (blog, likes) => {
  cy.get('.blog').contains(blog).contains('view').click()
  cy.get('.blog')
    .contains(blog)
    .get('#likes')
    .then($blog => {
      if (value === likes) {
        value = 0
        return
      } else if ($blog.text().includes(value)) {
        cy.get($blog).get('#like-button').click()
        value++
      }
      cy.wait(500, { log: false })
      cy.reload()
      addLikes(blog, likes)
    })
}
