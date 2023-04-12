import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { listEntries } from '../actions/entryActions';

import AllPosts from "../components/AllPosts"
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';

//NEEDED FOR EMAIL SUBSCRIPTION
import MailchimpSubscribe from "react-mailchimp-subscribe"
const url = 'https://gmail.us13.list-manage.com/subscribe/post?u=2a55f12e43a3f882ef012cd36&amp;id=7ded02caea&amp;f_id=007e8ae2f0';

const HomeScreen = () => {
    const dispatch = useDispatch()
    const params = useParams();

    const keyword = params.keyword;

    const entryList = useSelector(state => state.entryList)
    const { loading, error, entries} = entryList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    useEffect(() => {
        dispatch(listEntries(keyword))
    }, [dispatch, keyword])

    return (
        <div>
            {entries.map((entry) => (
                <div key={entry._id}>
                    <AllPosts entry={entry} />
                </div>
            ))}

            {/* NEWSLETTER */}
            <MailchimpSubscribe
                url={url}
                render={({ subscribe, status, message }) => (
                <Newsletter
                    status={status}
                    message={message}
                    onValidated={formData => subscribe(formData)}
                />
                )}
            />

            <Footer />
        </div>
    )
}

export default HomeScreen
