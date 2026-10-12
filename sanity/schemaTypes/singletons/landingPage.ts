import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'heroSection'
    }),
    defineField({
      name: 'credibility',
      title: 'Credibility Section',
      type: 'credibilitySection'
    }),
    defineField({
      name: 'problem',
      title: 'Problem Section',
      type: 'problemSection'
    }),
    defineField({
      name: 'hub',
      title: 'Hub Section',
      type: 'hubSection'
    }),
    defineField({
      name: 'audience',
      title: 'Audience Section',
      type: 'audienceSection'
    }),
    defineField({
      name: 'services',
      title: 'Services Section',
      type: 'servicesSection'
    }),
    defineField({
      name: 'whyChoose',
      title: 'Why Choose Section',
      type: 'whyChooseSection'
    }),
    defineField({
      name: 'contact',
      title: 'Contact Section',
      type: 'contactSection'
    })
  ]
})
