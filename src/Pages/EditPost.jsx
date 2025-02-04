import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import appwriteServie from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'

const EditPost = () => {

  const [post, setPost] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (slug) {
      appwriteServie.getPost(slug).then((post) => {
        if (post) {
          setPost(post)
        }
      })
    }
  }, [slug, navigate])


  return post ? (
    <div className='py-8'>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null
}

export default EditPost
