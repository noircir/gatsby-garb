/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

const PostTemplate = path.resolve('./src/templates/post-template.js');

//============================
// Create a slug (brunch) 'posts' onto which new posts will be attached.
//============================
// getNode defaults to /src/pages
exports.onCreateNode = ({ node, getNode, actions }) => {
	const { createNodeField } = actions;

	if (node.internal.type === 'MarkdownRemark') {
		const slug = createFilePath({ node, getNode, basePath: 'posts' });

		createNodeField({
			node,
			name: 'slug',
			value: slug
		});
	}
};

//============================
// Create a page out of PostTemplate and a separate slug for it.
//============================
exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;

	const result = await graphql(`
		{
			allMarkdownRemark {
				edges {
					node {
						fields {
							slug
						}
					}
				}
			}
		}
	`);

	const posts = result.data.allMarkdownRemark.edges;

	posts.forEach(({ node: post }) => {
		createPage({
			path: `posts${post.fields.slug}`,
			component: PostTemplate,
			context: {
				slug: post.fields.slug
			}
		});
	});
};
