const User = require('../models/User')
const validator = require('validator')

exports.getLogin = (req, res) => {
    res.render('login') 
}

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      req.flash('errors', { msg: 'Email or password does not exist' })
      return res.redirect('/signup')
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      req.flash('errors', { msg: 'Email or password does not exist' })
      return res.redirect('/signup')
    }

    req.logIn(user, (err) => {
      if (err) return next(err)
      res.redirect('/todos')
    })

  } catch (err) {
    return next(err)
  }
}

exports.getSignup = (req, res) => {
    res.render('signup') 
}

exports.postSignup = async (req, res, next) => {
    const validationErrors = []

    if (!validator.isEmail(req.body.email)) {
        validationErrors.push({ msg: 'Please enter a valid email address.' })
    }
    if (!validator.isLength(req.body.password, { min: 8 })) {
        validationErrors.push({ msg: 'Password must be at least 8 characters long' })
    }
    if (req.body.password !== req.body.confirmPassword) {
        validationErrors.push({ msg: 'Passwords do not match' })
    }

    if (validationErrors.length) {
        req.flash('errors', validationErrors)
        return res.redirect('/signup')
    }

    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

    try {
        const existingUser = await User.findOne({
            $or: [
                { email: req.body.email },
                { userName: req.body.userName }
            ]
        })

        if (existingUser) {
            req.flash('errors', { msg: 'Account with that email address or username already exists.' })
            return res.redirect('/login')
        }

        const user = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password
        })

        await user.save()

        req.logIn(user, (err) => {
            if (err) return next(err)
            res.redirect('/todos')
        })

    } catch (err) {
        return next(err)
    }
}

exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) return next(err)
        res.redirect('/')
    })
}