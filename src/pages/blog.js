import React, { Fragment } from 'react';
import { StaticQuery, Link, graphql } from 'gatsby';

import Layout from '../components/layout';

const blogMarkdownData = graphql`
	{
		allMarkdownRemark {
			totalCount
			edges {
				node {
					fields {
						slug
					}
					id
					frontmatter {
						title
						date
					}
					excerpt
				}
			}
		}
	}
`;

export default () => (
	<Layout>
		<div>
			<h1
				style={{
					display: 'inlineBlock',
					borderBottom: '1px solid'
				}}
			>
				Gatsby Garb Blog
			</h1>
		</div>

		<StaticQuery
			query={blogMarkdownData}
			render={(data) => (
				<Fragment>
					<h4>{data.allMarkdownRemark.totalCount} Posts</h4>
					{data.allMarkdownRemark.edges.map(({ node }) => (
						<div key={node.id}>
							<h3>
								<Link to={`/posts${node.fields.slug}`}>{node.frontmatter.title}</Link>{' '}
								<span style={{ color: '#bbb' }}>- {node.frontmatter.date}</span>
							</h3>
							<p>{node.excerpt}</p>
						</div>
					))}
				</Fragment>
			)}
		/>

		<Link to="/">Go back to the homepage</Link>
	</Layout>
);
