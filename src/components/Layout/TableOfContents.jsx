import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

const Links = ({ entries }) => (
  <StyledLinkList>
    {entries.map(({ entry }, key) => (
      <EntryListItem key={`link${key}`}>
        <Link to={entry.childMarkdownRemark.fields.slug}>
          <EntryTitle>{entry.childMarkdownRemark.frontmatter.title}</EntryTitle>
        </Link>
      </EntryListItem>
    ))}
  </StyledLinkList>
)

const ChapterList = ({ chapters, entries, title, level = 0 }) => (
  <StyledChapterList>
    {title && <ChapterListItem key={`chapter${level}`}>
      <ChapterTitle level={level}>{title}</ChapterTitle>
    </ChapterListItem>}
    <ChapterListItem>
      {entries && <Links entries={entries} />}
    </ChapterListItem>
    <ChapterListItem>
      {chapters && chapters.map(chapter => (
        <ChapterList {...chapter} level={level + 1} />
      ))}
    </ChapterListItem>
  </StyledChapterList>
)

const TableOfContents = ({ chapters }) => (
  <TOCWrapper>{chapters.map(chapter => <ChapterList {...chapter} />)}</TOCWrapper>
)

export default TableOfContents

const TOCWrapper = styled.div`
  padding: ${props => props.theme.sitePadding};
  margin: 0;
`

const StyledChapterList = styled.ol`
  list-style: none;
  margin: 0;
`

const StyledLinkList = styled.ol`
  list-style: none;
`

const EntryTitle = styled.h6`
  display: inline-block;
  font-weight: 200;
  color: black;
  margin: 0;
  line-height: 1.5;
  border-bottom: 1px solid transparent;
  text-decoration: none;
`

const ChapterListItem = styled.li`
  margin: 0;
`

const EntryListItem = styled.li`
  margin: 0;
  a:hover {
    border-bottom: 1px solid black;
  }
`

const ChapterTitle = styled.h5`
  font-weight: ${({ level }) => {
    switch (level % 3) {
      case 1:
        return '600'
      case 2:
        return '400'
      default:
        return '200'
    }
  }};
  font-size: ${({ level }) => {
    switch (level % 3) {
      case 1:
        return '2.4rem'
      case 2:
        return '2rem'
      default:
        return '2.8rem'
    }
  }};
  color: ${({ level, theme }) => {
    switch (level % 3) {
      case 1:
        return 'black'
      case 2:
        return 'blue'
      default:
        return theme.brand
    }
  }};
  margin-bottom: ${({ level }) => {
    switch (level % 3) {
      case 1:
        return '7px'
      case 2:
        return '5px'
      default:
        return '10px'
    }
  }};
`
