package ca.skipatrol.application.Interfaces;

import ca.skipatrol.application.models.Uniform;

import java.util.UUID;

public interface ProfileServices {

    Uniform retrieveUniform(UUID uniformID, boolean getVests, boolean getJackets, boolean getPacks);

}
