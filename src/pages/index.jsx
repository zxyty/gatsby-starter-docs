import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import SEO from '../components/SEO'
import config from '../../data/SiteConfig'
// import CtaButton from '../components/CtaButton'
import Navigation from '../components/Layout/Navigation'

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offsetTop: 250
    }
  }
  componentDidMount() {
    if (document.body.offsetWidth >= 1440) {
      this.setState({
        offsetTop: 250
      })
    } else if(document.body.offsetWidth < 1400 && document.body.offsetWidth >= 1200){
      this.setState({
        offsetTop: 200
      })
    } else if(document.body.offsetWidth < 1200 && document.body.offsetWidth >= 1040){
      this.setState({
        offsetTop: 150
      })
    } else {
      this.setState({
        offsetTop: 150
      })
    }
  }
  render() {
    const allSEOMarkdown = this.props.data.allMarkdown.edges

    return (
      <div>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            minWidth: 1040,
            background: 'url(/logos/bg.svg)',
            backgroundposition: 'center',
            backgroundSize: 'cover',
          }}
        />
        <div
          className="index-container"
          style={{ minWidth: 1040, position: 'relative' }}
        >
          <Helmet title={config.siteTitle} />
          <SEO postEdges={allSEOMarkdown} />

          <IndexHeadContainer>
            <Navigation />
            <Hero>
              <div
                style={{
                  margin: '0 auto',
                  marginTop: this.state.offsetTop,
                  border: '1px solid #ccc',
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  overflow: 'hidden'
                }}
              >
                <img src={config.userAvatar} width="120px" alt="" />
              </div>
              <h1
                style={{
                  color: '#fff',
                  fontSize: 18,
                  padding: 0,
                  margin: 0,
                  marginTop: 30
                }}
              >
                {config.siteTitle}
              </h1>
              <h4
                style={{
                  color: '#fff',
                  fontSize: 16,
                  padding: 0,
                  margin: 0,
                  marginTop: 30
                }}
              >
                {config.siteDescription}
              </h4>
            </Hero>
          </IndexHeadContainer>
        </div>
      </div>
    )
  }
}

export default Index

const IndexHeadContainer = styled.div`
  padding: ${props => props.theme.sitePadding};
  text-align: center;
`

const Hero = styled.div`
  padding: 50px 0;
  margin-top: ${props => props.offsetTop}
  & > h1 {
    font-weight: 600;
  }
`

const BodyContainer = styled.div`
  padding: ${props => props.theme.sitePadding};
  max-width: ${props => props.theme.contentWidthLaptop};
  margin: 0 auto;

  .contributors {
    max-width: 400px;
    margin: 100px auto 0;
  }
`

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdown: allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
          }
        }
      }
    }
    posts: allMarkdownRemark(
      limit: 2000
      filter: { frontmatter: { type: { eq: "post" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
          }
        }
      }
    }
  }
`
