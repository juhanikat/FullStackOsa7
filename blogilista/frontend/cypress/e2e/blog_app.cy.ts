describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username:"cypress",
      password:"cypress"
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.visit('http://localhost:3000') // this needs to be repeated or test fails for some reason
      cy.get('#username').type('cypress')
      cy.get('#password').type('cypress')
      cy.contains('Login').click()

      cy.contains('User cypress logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('cypress')
      cy.get('#password').type('nah')
      cy.contains('Login').click()

      cy.contains('invalid username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', { 
        username: 'cypress', password: 'cypress'   
      }).then(response => {  
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))    
        cy.visit('http://localhost:3000')    
      })
    })

    it('A blog can be created', function() {
      cy.contains('Create Blog').click()
      cy.get("#title").type('cypress')
      cy.get("#author").type('is')
      cy.get("#url").type('fun')
      cy.contains("add").click()

      cy.get('.blogsDiv').contains("cypress is")
    })

    it('blogs are ordered by amount of likes', function() {
      cy.contains('Create Blog').click()
      cy.get("#title").type('cypress')
      cy.get("#author").type('is')
      cy.get("#url").type('fun')
      cy.contains("add").click()

      cy.get("#title").type('cypress2')
      cy.get("#author").type('is2')
      cy.get("#url").type('fun2')
      cy.contains("add").click()

      cy.get("#title").type('cypress3')
      cy.get("#author").type('is3')
      cy.get("#url").type('fun3')
      cy.contains("add").click()

      cy.get('.blog').eq(0).contains('View').click()
      cy.wait(100)
      cy.get('.blog').eq(1).contains('View').click()
      cy.wait(100)
      cy.get('.blog').eq(2).contains('View').click()
      cy.wait(100)

      cy.get('.blog').eq(0).contains('Like').click()
      cy.wait(200)
      cy.get('.blog').eq(0).contains('Like').click()
      cy.wait(200)

      cy.get('.blog').eq(1).contains('Like').click()
      cy.wait(200)
      cy.get('.blog').eq(1).contains('Like').click()
      cy.wait(200)
      cy.get('.blog').eq(1).contains('Like').click()
      cy.wait(200)

      cy.get('.blog').eq(2).contains('Like').click()
      cy.wait(200)

      cy.get('.blog').eq(0).contains('cypress2') // test that the most liked blog is first on the list
    })

    describe('when blog is created', function() {
      beforeEach(function() {
        cy.contains('Create Blog').click()
        cy.get("#title").type('cypress')
        cy.get("#author").type('is')
        cy.get("#url").type('fun')
        cy.contains("add").click()
      })

      it('it can be liked', function() {
        cy.contains('View').click()
        cy.contains('Like').click()
        cy.contains('Likes: 1')
      })
      
      it('it can be removed by user who created it', function() {
        cy.contains('View').click({force:true})
        cy.contains('Remove').click({force:true})
        cy.wait(500)
        cy.get('.blogsDiv').contains("cypress is").should('not.exist')
      })

      it('only the user who created the blog sees the Remove button', function() {
        cy.contains('View').click({force:true})
        cy.contains('Remove')
        const user2 = {
          username:"cypress2",
          password:"cypress2"
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user2) 

        cy.request('POST', 'http://localhost:3003/api/login', { 
        username: 'cypress2', password: 'cypress2'   
      }).then(response => {  
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))    
        cy.visit('http://localhost:3000')    
      })
      cy.contains('View').click({force:true})
      cy.contains('Remove').should('not.exist')
      })
    })

    
  })

  
})
