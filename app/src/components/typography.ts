import styled from 'styled-components'

interface Props {
  margin?: string
  color?: string
  fontSize?: string
  fontStyle?: string
  fontWeight?: string
  textDecoration?: string
}

export const H1 = styled.h1<Props>`
  font-size: 2em;
  margin: ${({ margin }) => margin && margin};
  color: ${({ color }) => color ? color + ' !important' : '#eab8b2'};
  font-size: ${({ fontSize }) => fontSize && fontSize};
  font-style: ${({ fontStyle }) => fontStyle && fontStyle};
  font-weight: ${({ fontWeight }) => fontWeight && fontWeight};
  text-decoration: ${({ textDecoration }) => textDecoration && textDecoration};
`

export const H2 = styled.h2<Props>`
  font-size: 1.75em;
  margin: ${({ margin }) => margin && margin};
  color: ${({ color }) => color ? color + ' !important' : '#eab8b2'};
  font-size: ${({ fontSize }) => fontSize && fontSize};
  font-style: ${({ fontStyle }) => fontStyle && fontStyle};
  font-weight: ${({ fontWeight }) => fontWeight && fontWeight};
  text-decoration: ${({ textDecoration }) => textDecoration && textDecoration};
`

export const H3 = styled.h3<Props>`
  font-size: 1.5em;
  margin: ${({ margin }) => margin && margin};
  color: ${({ color }) => color ? color + ' !important' : '#eab8b2'};
  font-size: ${({ fontSize }) => fontSize && fontSize};
  font-style: ${({ fontStyle }) => fontStyle && fontStyle};
  font-weight: ${({ fontWeight }) => fontWeight && fontWeight};
  text-decoration: ${({ textDecoration }) => textDecoration && textDecoration};
`

export const H4 = styled.h4<Props>`
  font-size: 1.25em;
  margin: ${({ margin }) => margin && margin};
  color: ${({ color }) => color ? color + ' !important' : '#eab8b2'};
  font-size: ${({ fontSize }) => fontSize && fontSize};
  font-style: ${({ fontStyle }) => fontStyle && fontStyle};
  font-weight: ${({ fontWeight }) => fontWeight && fontWeight};
  text-decoration: ${({ textDecoration }) => textDecoration && textDecoration};
`

export const H5 = styled.h5<Props>`
  font-size: 1em;
  margin: ${({ margin }) => margin && margin};
  color: ${({ color }) => color ? color + ' !important' : '#eab8b2'};
  font-size: ${({ fontSize }) => fontSize && fontSize};
  font-style: ${({ fontStyle }) => fontStyle && fontStyle};
  font-weight: ${({ fontWeight }) => fontWeight && fontWeight};
  text-decoration: ${({ textDecoration }) => textDecoration && textDecoration};
`

export const H6 = styled.h6<Props>`
  font-size: 0.75em;
  margin: ${({ margin }) => margin && margin};
  color: ${({ color }) => color ? color + ' !important' : '#eab8b2'};
  font-size: ${({ fontSize }) => fontSize && fontSize};
  font-style: ${({ fontStyle }) => fontStyle && fontStyle};
  font-weight: ${({ fontWeight }) => fontWeight && fontWeight};
  text-decoration: ${({ textDecoration }) => textDecoration && textDecoration};
`

export const Text = styled.p<Props>`
  margin: ${({ margin }) => margin && margin};
  color: ${({ color }) => color ? color + ' !important' : '#EEEEEE'};
  font-size: ${({ fontSize }) => fontSize && fontSize};
  font-style: ${({ fontStyle }) => fontStyle && fontStyle};
  font-weight: ${({ fontWeight }) => fontWeight && fontWeight};
  text-decoration: ${({ textDecoration }) => textDecoration && textDecoration};
`