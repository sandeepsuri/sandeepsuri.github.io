const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const controllers = require('../controllers')
const router = vertex.router()

/* *
 * This is an example home route which renders the "home" 
 * template using the 'home.json' file from the pages 
 * folder to populate template data.
 */
router.get('/', (req, res) => {
    const data = req.context // {cdn:<STRING>, global:<OBJECT>}  
	
	turbo.pageConfig('home', process.env.TURBO_APP_ID, process.env.TURBO_ENV)
	.then(homeConfig => {
		// For About Me Contacts
		const aboutStr = homeConfig.aboutMe.about_short
		const aboutArr = aboutStr.split(',')
		homeConfig.aboutMe['about_short'] = aboutArr.map(about_me => {
			const aboutPart = about_me.split(':')
			if(aboutPart.length > 1) {
				const aboutObj = {}
				aboutObj['name'] = aboutPart[0]
				aboutObj['ans'] = aboutPart[1]

				return aboutObj
			}
		})

		// For my skills
		const skillsStr = homeConfig.skillSection.skills
		const skillsArr = skillsStr.split(',')
		homeConfig.skillSection['skills'] = skillsArr.map(skill => {
			//html5: 90%
			const skillPart = skill.split(':')
			if (skillPart.length > 1) {
				const skillObj = {}
				skillObj['name'] = skillPart[0]
				skillObj['exp'] = skillPart[1]
				skillObj['percent'] = skillPart[2]

				return skillObj
			}
		})

		data['page'] = homeConfig
		return turbo.currentApp(process.env.TURBO_ENV)
	})
	.then(site => {
		data['site'] = site
		data['global'] = site.globalConfig
		data['preloaded'] = JSON.stringify({
			page: data.page,
			global: data.global
		}); 
		res.render('home', data) // render home.mustache  
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: 'Something went wrong with the route'
		})
	})
})

/* *
 * This is an example route which renders various pages based 
 * on the 'req.params.page' parameter passed in the url
 */
router.get('/:page', (req, res) => {
    res.render(req.params.page, data)
})

/* *
 * This is a REST APT route which uses the models and 
 * controllers for resource and CRUD operations. 
 */
const APIRouter = vertex.APIRouter
const api = new APIRouter({
    site_id: process.env.TURBO_APP_ID,
    api_key: process.env.TURBO_API_KEY,
    env: process.env.TURBO_ENV
})

module.exports = {
    api: api.router(controllers),
    page: router
}

