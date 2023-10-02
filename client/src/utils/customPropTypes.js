import PropTypes from 'prop-types';

export const productPropTypes = PropTypes.shape({
    id: PropTypes.number.isRequired,
    productName: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    place: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    isSelled: PropTypes.bool.isRequired,
});

export const userPropTypes = PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    bio: PropTypes.string,
});
