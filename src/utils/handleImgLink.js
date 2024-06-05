import noPicture from '../assets/noPictureUri'
import { API_URL } from '../config/api'

export const handleImgCampaign = (image) => {
    if (!image) return noPicture
    return image.includes('https')
        ? image
        : `${API_URL}${image.includes('/') ? image : `/images/images_campaign/${image}`
        }`
}

export const handleImgProfil = (image) => {
    if (!image) return noPicture
    return image.includes('https')
        ? image
        : `${API_URL}${image.includes('/') ? image : `/images/images_profile/${image}`
        }`
}

export const handleFotoBackground = (image) => {
    if (!image) return noPicture
    return image.includes('https')
        ? image
        : `${API_URL}${image.includes('/') ? image : `/images/images_cover/${image}`
        }`
}
